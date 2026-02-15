import { pgTable, uuid, uniqueIndex, index } from 'drizzle-orm/pg-core';
import { schools } from './school';
import { categories } from './school-categories';

export const schoolCategories = pgTable(
  'school_categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, { onDelete: 'cascade' }),

    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    uniqueRelation: uniqueIndex('school_categories_unique').on(
      table.schoolId,
      table.categoryId,
    ),
    schoolIdx: index('school_categories_school_idx').on(table.schoolId),
    categoryIdx: index('school_categories_category_idx').on(table.categoryId),
  }),
);
