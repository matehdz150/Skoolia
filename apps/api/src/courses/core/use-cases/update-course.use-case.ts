import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { COURSE_REPOSITORY } from '../ports/tokens';
import type { CourseRepository } from '../ports/course.repository';
import { SCHOOL_REPOSITORY } from 'src/schools/core/ports/tokens';
import type { SchoolRepository } from 'src/schools/core/ports/school.repository';

export class UpdateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: CourseRepository,

    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
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
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    const school = await this.schoolRepository.findByOwner(params.ownerId);

    if (!school) {
      throw new ForbiddenException('You do not own a school');
    }

    const course = await this.courseRepository.findById(params.courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.schoolId !== school.id) {
      throw new ForbiddenException(
        'You cannot update a course from another school',
      );
    }

    return this.courseRepository.update({
      courseId: params.courseId,
      data: params.data,
    });
  }
}
