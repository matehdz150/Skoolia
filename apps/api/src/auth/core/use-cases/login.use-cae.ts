import { UnauthorizedException } from "@nestjs/common";
import type { JwtPort } from "../ports/jwt.port";
import type { UserAuthRepository } from "../ports/user-auth.repository";
import type { PasswordHasher } from "../services/password-hassher";

export class LoginUseCase {
	constructor(
		private readonly userRepository: UserAuthRepository,
		private readonly jwt: JwtPort,
		private readonly passwordHasher: PasswordHasher,
	) {}

	async execute(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isValid = await this.passwordHasher.compare(
			password,
			user.passwordHash,
		);

		if (!isValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const token = await this.jwt.sign({
			sub: user.id,
			role: user.role,
		});

		return { accessToken: token };
	}
}
