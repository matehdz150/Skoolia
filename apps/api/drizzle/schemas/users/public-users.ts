import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { files } from '../files';

/**
 * Public users
 * - Usuarios que buscan escuelas
 * - Pueden guardar escuelas en favoritos
 */
export const publicUsers = pgTable(
  'public_users',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text('name'),

    avatarUrl: uuid('avatarUrl').references(() => files.id, {
      onDelete: 'set null',
    }),

    email: text('email').notNull().unique(),

    passwordHash: text('password_hash').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    // 🔍 login / lookup rápido
    emailIdx: index('public_users_email_idx').on(table.email),
  }),
);
