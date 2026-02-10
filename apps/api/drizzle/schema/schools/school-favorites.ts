import {
	index,
	pgTable,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { publicUsers } from "../users/public-users";
import { schools } from "./school";

/**
 * School favorites
 * - Public users pueden guardar escuelas
 */
export const schoolFavorites = pgTable(
	"school_favorites",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		publicUserId: uuid("public_user_id")
			.notNull()
			.references(() => publicUsers.id, {
				onDelete: "cascade",
			}),

		schoolId: uuid("school_id")
			.notNull()
			.references(() => schools.id, {
				onDelete: "cascade",
			}),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => ({
		/**
		 * 🔒 Un usuario no puede
		 * guardar la misma escuela 2 veces
		 */
		uniqueFavorite: uniqueIndex("school_favorites_unique").on(
			table.publicUserId,
			table.schoolId,
		),

		/**
		 * 🔍 performance
		 */
		userIdx: index("school_favorites_user_idx").on(table.publicUserId),

		schoolIdx: index("school_favorites_school_idx").on(table.schoolId),
	}),
);
