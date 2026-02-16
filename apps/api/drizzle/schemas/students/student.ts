// drizzle/schemas/students/student.ts

import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  doublePrecision,
  index,
} from 'drizzle-orm/pg-core';

import { publicUsers } from '../users/public-users';

export const students = pgTable(
  'students',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    publicUserId: uuid('public_user_id')
      .notNull()
      .references(() => publicUsers.id, { onDelete: 'cascade' }),

    name: text('name').notNull(),

    age: integer('age').notNull(),

    monthlyBudget: doublePrecision('monthly_budget'), // opcional

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index('students_user_idx').on(table.publicUserId),
  }),
);
