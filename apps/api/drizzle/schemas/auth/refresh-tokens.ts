import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    // el userId puede apuntar a public_users o private_users
    userId: uuid('user_id').notNull(),

    role: text('role').$type<'public' | 'private'>().notNull(),

    // hash del refresh token (no guardes el token en texto plano)
    tokenHash: text('token_hash').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    // para expiración lógica (opcional pero recomendable)
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('refresh_tokens_user_idx').on(t.userId),
    userRoleUnique: uniqueIndex('refresh_tokens_user_role_unique').on(
      t.userId,
      t.role,
    ),
  }),
);
