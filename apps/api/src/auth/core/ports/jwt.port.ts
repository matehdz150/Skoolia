import type { JwtPayload } from '../types/jwt-payload';

export interface JwtPort {
  signAccessToken(payload: JwtPayload): Promise<string>;
  signRefreshToken(payload: JwtPayload): Promise<string>;

  verifyAccessToken(token: string): Promise<JwtPayload>;
  verifyRefreshToken(token: string): Promise<JwtPayload>;
}
