import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { schools } from '../schools';
import { publicUsers } from '../users';

export const schoolMessages = pgTable(
  'school_messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, { onDelete: 'cascade' }),

    publicUserId: uuid('public_user_id')
      .notNull()
      .references(() => publicUsers.id, { onDelete: 'cascade' }),

    senderRole: text('sender_role').$type<'public' | 'private'>().notNull(),

    content: text('content').notNull(),

    readAt: timestamp('read_at'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    schoolIdx: index('school_messages_school_idx').on(table.schoolId),
    publicUserIdx: index('school_messages_public_user_idx').on(table.publicUserId),
    threadIdx: index('school_messages_thread_idx').on(
      table.schoolId,
      table.publicUserId,
      table.createdAt,
    ),
  }),
);
