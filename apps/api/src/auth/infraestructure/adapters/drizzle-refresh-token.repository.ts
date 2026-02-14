import { Inject, Injectable } from "@nestjs/common";
import { refreshTokens } from "drizzle/schemas";
import { and, eq } from "drizzle-orm";
import type { RefreshTokenRepository } from "src/auth/core/ports/refresh-tokens.repository";
import { DATABASE } from "src/db/db.module";
import type { Database } from "src/db/db.types";

@Injectable()
export class DrizzleRefreshTokenRepository implements RefreshTokenRepository {
	constructor(@Inject(DATABASE) private readonly db: Database) {}

	async upsert(params: {
		userId: string;
		role: "public" | "private";
		tokenHash: string;
		expiresAt: Date;
	}): Promise<void> {
		// estrategia simple: delete + insert (MVP) para evitar pelear con upsert/unique
		await this.deleteByUser({ userId: params.userId, role: params.role });

		await this.db.insert(refreshTokens).values({
			userId: params.userId,
			role: params.role,
			tokenHash: params.tokenHash,
			expiresAt: params.expiresAt,
		});
	}

	async findByUser(params: { userId: string; role: "public" | "private" }) {
		const rows = await this.db
			.select({
				tokenHash: refreshTokens.tokenHash,
				expiresAt: refreshTokens.expiresAt,
			})
			.from(refreshTokens)
			.where(
				and(
					eq(refreshTokens.userId, params.userId),
					eq(refreshTokens.role, params.role),
				),
			)
			.limit(1);

		return rows[0] ?? null;
	}

	async deleteByUser(params: { userId: string; role: "public" | "private" }) {
		await this.db
			.delete(refreshTokens)
			.where(
				and(
					eq(refreshTokens.userId, params.userId),
					eq(refreshTokens.role, params.role),
				),
			);
	}
}
