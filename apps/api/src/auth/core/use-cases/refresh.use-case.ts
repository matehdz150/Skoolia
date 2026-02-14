import { Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import type * as jwtPort from "../ports/jwt.port";
import type * as refreshTokensRepository from "../ports/refresh-tokens.repository";
import { JWT_PORT, REFRESH_TOKEN_REPOSITORY } from "../ports/tokens";

export class RefreshUseCase {
	constructor(
		@Inject(JWT_PORT)
		private readonly jwt: jwtPort.JwtPort,

		@Inject(REFRESH_TOKEN_REPOSITORY)
		private readonly refreshRepository: refreshTokensRepository.RefreshTokenRepository,
	) {}

	async execute(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		const payload = await this.jwt.verifyRefreshToken(refreshToken);

		const stored = await this.refreshRepository.findByUser({
			userId: payload.sub,
			role: payload.role,
		});

		if (!stored || stored.expiresAt < new Date()) {
			throw new UnauthorizedException();
		}

		const isValid = await bcrypt.compare(refreshToken, stored.tokenHash);

		if (!isValid) {
			throw new UnauthorizedException();
		}

		// 🔁 ROTATE TOKENS
		const newAccessToken = await this.jwt.signAccessToken({
			sub: payload.sub,
			role: payload.role,
		});

		const newRefreshToken = await this.jwt.signRefreshToken({
			sub: payload.sub,
			role: payload.role,
		});

		const newHash = await bcrypt.hash(newRefreshToken, 10);

		await this.refreshRepository.upsert({
			userId: payload.sub,
			role: payload.role,
			tokenHash: newHash,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}
}
