import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { schools } from './school';
import { publicUsers } from '../users/public-users';

export const schoolRatings = pgTable(
  'school_ratings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, { onDelete: 'cascade' }),

    publicUserId: uuid('public_user_id')
      .notNull()
      .references(() => publicUsers.id, { onDelete: 'cascade' }),

    rating: integer('rating').notNull(), // 1–5

    comment: text('comment'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserRating: uniqueIndex('school_rating_unique').on(
      table.schoolId,
      table.publicUserId,
    ),
    schoolIdx: index('school_ratings_school_idx').on(table.schoolId),
  }),
);
