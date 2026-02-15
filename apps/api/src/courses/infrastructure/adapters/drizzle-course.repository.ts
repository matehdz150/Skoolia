import { Inject, Injectable } from '@nestjs/common';
import { courses } from 'drizzle/schemas/courses/courses';
import { CourseRepository } from 'src/courses/core/ports/course.repository';
import { Course } from 'src/courses/core/types/course.types';
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
}
