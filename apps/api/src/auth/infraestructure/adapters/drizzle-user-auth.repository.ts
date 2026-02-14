import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import { privateUsers, publicUsers } from "drizzle/schemas";
import { eq } from "drizzle-orm";
import type { UserAuthRepository } from "src/auth/core/ports/user-auth.repository";
import type { AuthUser } from "src/auth/core/types/auth.types";
import { DATABASE } from "src/db/db.module";
import type { Database } from "src/db/db.types";

@Injectable()
export class DrizzleUserAuthRepository implements UserAuthRepository {
	constructor(@Inject(DATABASE) private readonly db: Database) {}

	async findByEmail(email: string): Promise<AuthUser | null> {
		// 🔎 Buscar primero en public users
		const publicResult = await this.db
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.email, email))
			.limit(1);

		const publicUser = publicResult[0];

		if (publicUser) {
			return {
				id: publicUser.id,
				email: publicUser.email,
				passwordHash: publicUser.passwordHash,
				role: "public",
			};
		}

		// 🔎 Buscar en private users
		const privateResult = await this.db
			.select()
			.from(privateUsers)
			.where(eq(privateUsers.email, email))
			.limit(1);

		const privateUser = privateResult[0];

		if (privateUser) {
			return {
				id: privateUser.id,
				email: privateUser.email,
				passwordHash: privateUser.passwordHash,
				role: "private",
			};
		}

		return null;
	}

	async create(params: {
		email: string;
		passwordHash: string;
		role: "public" | "private";
	}) {
		if (params.role === "public") {
			const result = await this.db
				.insert(publicUsers)
				.values({
					id: randomUUID(),
					email: params.email,
					passwordHash: params.passwordHash,
				})
				.returning();

			const user = result[0];

			return {
				id: user.id,
				email: user.email,
				passwordHash: user.passwordHash,
				role: "public" as const,
			};
		}

		const result = await this.db
			.insert(privateUsers)
			.values({
				id: randomUUID(),
				email: params.email,
				passwordHash: params.passwordHash,
			})
			.returning();

		const user = result[0];

		return {
			id: user.id,
			email: user.email,
			passwordHash: user.passwordHash,
			role: "private" as const,
		};
	}
}
