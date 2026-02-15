import type { Course } from '../types/course.types';

export interface CourseRepository {
  create(params: {
    schoolId: string;
    name: string;
    description?: string;
    coverImageUrl?: string;
    price: number;
    capacity?: number;
    startDate?: Date;
    endDate?: Date;
    modality?: string;
  }): Promise<Course>;
}
