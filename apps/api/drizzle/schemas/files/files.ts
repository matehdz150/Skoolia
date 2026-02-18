import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const files = pgTable(
  'files',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    // 🔐 referencia interna al storage
    key: text('key').notNull(),

    // 🌍 url pública
    url: text('url').notNull(),

    // 📄 metadata
    mimeType: text('mime_type').notNull(),
    sizeBytes: integer('size_bytes').notNull(),

    // 🧠 ownership
    ownerId: uuid('owner_id').notNull(),
    ownerType: text('owner_type').notNull(),
    // ejemplo: 'school' | 'course' | 'student' | 'user'

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    ownerIdx: index('files_owner_idx').on(table.ownerId, table.ownerType),
    keyIdx: index('files_key_idx').on(table.key),
  }),
);
