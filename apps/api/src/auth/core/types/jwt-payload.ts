export interface JwtPayload {
  sub: string;
  role: 'public' | 'private';
  iat?: number;
  exp?: number;
}
