export interface RefreshTokenRepository {
	save(userId: string, tokenHash: string): Promise<void>;
	findByUserId(userId: string): Promise<string | null>;
	delete(userId: string): Promise<void>;
}
