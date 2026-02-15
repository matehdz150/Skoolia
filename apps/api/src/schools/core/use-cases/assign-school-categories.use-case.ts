import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { SCHOOL_REPOSITORY } from '../ports/tokens';
import type { SchoolRepository } from '../ports/school.repository';

@Injectable()
export class AssignSchoolCategoriesUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
    categoryIds: string[];
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException('Only private users can assign categories');
    }

    const school = await this.schoolRepository.findByOwner(params.ownerId);

    if (!school) {
      throw new ForbiddenException('School not found');
    }

    await this.schoolRepository.assignCategories(school.id, params.categoryIds);
  }
}
