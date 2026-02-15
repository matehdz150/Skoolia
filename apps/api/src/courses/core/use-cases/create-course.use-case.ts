import { Inject, ForbiddenException } from '@nestjs/common';
import { COURSE_REPOSITORY } from '../ports/tokens';
import type { CourseRepository } from '../ports/course.repository';
import { SCHOOL_REPOSITORY } from 'src/schools/core/ports/tokens';
import type { SchoolRepository } from 'src/schools/core/ports/school.repository';

export class CreateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: CourseRepository,

    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
    name: string;
    description?: string;
    coverImageUrl?: string;
    price: number;
    capacity?: number;
    startDate?: Date;
    endDate?: Date;
    modality?: string;
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    const school = await this.schoolRepository.findByOwner(params.ownerId);

    if (!school) {
      throw new ForbiddenException('You must create a school first');
    }

    return this.courseRepository.create({
      schoolId: school.id,
      name: params.name,
      description: params.description,
      coverImageUrl: params.coverImageUrl,
      price: params.price,
      capacity: params.capacity,
      startDate: params.startDate,
      endDate: params.endDate,
      modality: params.modality,
    });
  }
}
