import { pgTable, uuid, varchar, text, integer, decimal, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { schools } from './schools';

export const courseModalityEnum = pgEnum('course_modality', ['online', 'presencial', 'híbrido']);
export const courseDurationUnitEnum = pgEnum('course_duration_unit', ['horas', 'semanas']);
export const courseDifficultyEnum = pgEnum('course_difficulty', ['básico', 'intermedio', 'avanzado']);

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  modality: courseModalityEnum('modality').notNull(),
  durationValue: integer('duration_value').notNull(),
  durationUnit: courseDurationUnitEnum('duration_unit').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  difficultyLevel: courseDifficultyEnum('difficulty_level').notNull(),
  certification: boolean('certification').notNull().default(false),
  schoolId: uuid('school_id').notNull().references(() => schools.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
