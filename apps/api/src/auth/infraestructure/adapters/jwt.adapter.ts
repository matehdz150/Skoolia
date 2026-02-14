import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtPort } from 'src/auth/core/ports/jwt.port';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  async signRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
