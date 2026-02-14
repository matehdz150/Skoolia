import { Inject, UnauthorizedException } from '@nestjs/common';
import type * as jwtPort from '../ports/jwt.port';
import type * as refreshTokensRepository from '../ports/refresh-tokens.repository';
import { JWT_PORT, REFRESH_TOKEN_REPOSITORY } from '../ports/tokens';

export class LogoutUseCase {
  constructor(
    @Inject(JWT_PORT)
    private readonly jwt: jwtPort.JwtPort,

    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshRepository: refreshTokensRepository.RefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwt.verifyRefreshToken(refreshToken);

    await this.refreshRepository.deleteByUser({
      userId: payload.sub,
      role: payload.role,
    });
  }
}
