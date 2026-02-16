import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { courses } from 'drizzle/schemas/courses/courses';
import { CourseRepository } from 'src/courses/core/ports/course.repository';
import { Course } from 'src/courses/core/entities/course.types';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';

@Injectable()
export class DrizzleCourseRepository implements CourseRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async create(params: {
    schoolId: string;
    name: string;
    description?: string;
    coverImageUrl?: string;
    price: number;
    capacity?: number;
    startDate?: Date;
    endDate?: Date;
    modality?: string;
  }): Promise<Course> {
    const [course] = await this.db
      .insert(courses)
      .values({
        schoolId: params.schoolId,
        name: params.name,
        description: params.description ?? null,
        coverImageUrl: params.coverImageUrl ?? null,
        price: params.price,
        capacity: params.capacity ?? null,
        startDate: params.startDate ?? null,
        endDate: params.endDate ?? null,
        modality: params.modality ?? null,
      })
      .returning();

    return course;
  }

  async findById(id: string) {
    const rows = await this.db
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);

    return rows[0] ?? null;
  }

  async update(params: { courseId: string; data: Partial<Course> }) {
    const [updated] = await this.db
      .update(courses)
      .set({
        ...params.data,
        updatedAt: new Date(), // 🔥 backend controla esto
      })
      .where(eq(courses.id, params.courseId))
      .returning();

    return updated;
  }

  async softDelete(courseId: string): Promise<void> {
    await this.db
      .update(courses)
      .set({
        isActive: false,
        status: 'archived',
        updatedAt: new Date(),
      })
      .where(eq(courses.id, courseId));
  }
}
