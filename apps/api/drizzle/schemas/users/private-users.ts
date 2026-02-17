import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Usuarios privados
 * - Cada uno podrá tener UNA escuela
 */
export const privateUsers = pgTable(
  'private_users',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    email: text('email').notNull().unique(),

    passwordHash: text('password_hash').notNull(),

    // flags útiles para el futuro
    isActive: text('is_active').default('true').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    // 🔍 login rápido
    emailIdx: index('private_users_email_idx').on(table.email),

    // 🔍 queries administrativas
    activeIdx: index('private_users_active_idx').on(table.isActive),
  }),
);
