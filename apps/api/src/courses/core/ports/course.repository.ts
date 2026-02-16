import type { Course } from '../entities/course.types';

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

  update(params: {
    courseId: string;
    data: {
      name?: string;
      description?: string;
      coverImageUrl?: string;
      price?: number;
      capacity?: number;
      startDate?: Date;
      endDate?: Date;
      modality?: string;
      status?: 'draft' | 'published' | 'archived';
      isActive?: boolean;
    };
  }): Promise<Course>;

  findById(id: string): Promise<Course | null>;

  softDelete(courseId: string): Promise<void>;
}
