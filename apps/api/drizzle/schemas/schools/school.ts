import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { privateUsers } from '../users/private-users';

/**
 * Schools
 * - Cada escuela pertenece a UN private user
 * - Un private user solo puede tener UNA escuela
 */
export const schools = pgTable(
  'schools',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text('name').notNull(),

    description: text('description'),

    // FK → private_users
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => privateUsers.id, {
        onDelete: 'cascade',
      }),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    /**
     * Un private user solo puede tener una escuela
     */
    ownerUnique: uniqueIndex('schools_owner_unique').on(table.ownerId),

    /**
     * 🔍 PERFORMANCE
     */
    ownerIdx: index('schools_owner_idx').on(table.ownerId),
    nameIdx: index('schools_name_idx').on(table.name),
  }),
);
