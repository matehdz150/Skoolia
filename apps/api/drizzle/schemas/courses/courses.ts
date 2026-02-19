import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  doublePrecision,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { schools } from '../schools/school';
import { files } from '../files';

/**
 * ENUM → Course status
 */
export const courseStatusEnum = pgEnum('course_status', [
  'draft',
  'published',
  'archived',
]);

export const courses = pgTable(
  'courses',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    schoolId: uuid('school_id')
      .notNull()
      .references(() => schools.id, {
        onDelete: 'cascade',
      }),

    name: text('name').notNull(),

    description: text('description'),

    coverImageUrl: uuid('cover_image_url').references(() => files.id, {
      onDelete: 'set null',
    }),

    // 💰 pricing
    price: integer('price').notNull().default(0),

    // 👥 capacity
    capacity: integer('capacity'),

    // 📅 scheduling
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),

    // 🌐 modalidad
    modality: text('modality'), // presencial | online | híbrido

    // ⭐ métricas
    averageRating: doublePrecision('average_rating').default(0).notNull(),

    enrollmentsCount: integer('enrollments_count').default(0).notNull(),

    // 🔄 estado
    status: courseStatusEnum('status').default('draft').notNull(),

    isActive: boolean('is_active').default(true).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    schoolIdx: index('courses_school_idx').on(table.schoolId),
    statusIdx: index('courses_status_idx').on(table.status),
    activeIdx: index('courses_active_idx').on(table.isActive),
    ratingIdx: index('courses_rating_idx').on(table.averageRating),
  }),
);
