export interface RefreshTokenRepository {
	upsert(params: {
		userId: string;
		role: "public" | "private";
		tokenHash: string;
		expiresAt: Date;
	}): Promise<void>;

	findByUser(params: {
		userId: string;
		role: "public" | "private";
	}): Promise<{ tokenHash: string; expiresAt: Date } | null>;

	deleteByUser(params: {
		userId: string;
		role: "public" | "private";
	}): Promise<void>;
}
