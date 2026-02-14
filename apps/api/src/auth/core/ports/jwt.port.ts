export interface JwtPort {
	sign(payload: Record<string, any>): Promise<string>;
}
