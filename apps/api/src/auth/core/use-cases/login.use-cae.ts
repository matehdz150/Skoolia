import { Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type * as jwtPort from '../ports/jwt.port';
import type * as refreshTokensRepository from '../ports/refresh-tokens.repository';
import {
  JWT_PORT,
  PASSWORD_HASHER,
  REFRESH_TOKEN_REPOSITORY,
  USER_AUTH_REPOSITORY,
} from '../ports/tokens';
import type * as userAuthRepository from '../ports/user-auth.repository';
import type * as passwordHassher from '../services/password-hassher';

export class LoginUseCase {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userRepository: userAuthRepository.UserAuthRepository,
    @Inject(JWT_PORT)
    private readonly jwt: jwtPort.JwtPort,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: passwordHassher.PasswordHasher,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshRepository: refreshTokensRepository.RefreshTokenRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwt.signAccessToken({
      sub: user.id,
      role: user.role,
    });

    const refreshToken = await this.jwt.signRefreshToken({
      sub: user.id,
      role: user.role,
    });

    // hash del refresh token
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await this.refreshRepository.upsert({
      userId: user.id,
      role: user.role,
      tokenHash: refreshHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
