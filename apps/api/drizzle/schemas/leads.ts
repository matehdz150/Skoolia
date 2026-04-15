import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { publicUsers } from './publicUsers';
import { schools } from './schools';
import { courses } from './courses';

export const leadStatusEnum = pgEnum('lead_status', ['pending', 'contacted', 'enrolled', 'rejected']);

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentId: uuid('parent_id').notNull().references(() => publicUsers.id, { onDelete: 'cascade' }),
  schoolId: uuid('school_id').notNull().references(() => schools.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'set null' }),
  status: leadStatusEnum('status').notNull().default('pending'),
  source: varchar('source', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
