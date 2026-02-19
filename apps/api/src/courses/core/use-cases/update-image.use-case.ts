import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';

import { COURSE_REPOSITORY } from '../ports/tokens';
import type { CourseRepository } from '../ports/course.repository';

import { SCHOOL_REPOSITORY } from 'src/schools/core/ports/tokens';
import type { SchoolRepository } from 'src/schools/core/ports/school.repository';

import { DeleteFileUseCase } from 'src/files/core/use-cases/delete-file.use-case';

export class UpdateCourseImageUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: CourseRepository,

    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,

    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
    courseId: string;
    fileId: string;
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    // 1️⃣ Verificar que el owner tenga escuela
    const school = await this.schoolRepository.findByOwner(params.ownerId);

    if (!school) {
      throw new ForbiddenException('You do not own a school');
    }

    // 2️⃣ Obtener curso raw
    const course = await this.courseRepository.findRawById(params.courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3️⃣ Validar que el curso pertenezca a su escuela
    if (course.schoolId !== school.id) {
      throw new ForbiddenException('You cannot modify this course');
    }

    // 4️⃣ Update atómico
    const { oldFileId } = await this.courseRepository.updateImageAtomic({
      courseId: params.courseId,
      ownerId: params.ownerId,
      newFileId: params.fileId,
    });

    // 5️⃣ Borrar archivo viejo si existe
    if (oldFileId && oldFileId !== params.fileId) {
      await this.deleteFileUseCase.execute(oldFileId);
    }

    // 6️⃣ Retornar curso ya con URL
    return this.courseRepository.findById(params.courseId);
  }
}
