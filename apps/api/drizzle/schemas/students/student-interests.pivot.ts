// drizzle/schemas/students/student-interests.pivot.ts

import { pgTable, uuid, uniqueIndex, index } from 'drizzle-orm/pg-core';

import { students } from './student';
import { categories } from '../schools/school-categories';

export const studentInterests = pgTable(
  'student_interests',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    studentId: uuid('student_id')
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),

    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    uniqueRelation: uniqueIndex('student_interests_unique').on(
      table.studentId,
      table.categoryId,
    ),
    studentIdx: index('student_interests_student_idx').on(table.studentId),
    categoryIdx: index('student_interests_category_idx').on(table.categoryId),
  }),
);
