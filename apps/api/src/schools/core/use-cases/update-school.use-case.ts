import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { SCHOOL_REPOSITORY } from '../ports/tokens';
import type { SchoolRepository } from '../ports/school.repository';
import { School } from '../entities/school.types';

export class UpdateSchoolUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
    data: Partial<School>;
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    const existing = await this.schoolRepository.findByOwner(params.ownerId);

    if (!existing) {
      throw new NotFoundException('School not found');
    }

    return this.schoolRepository.update({
      ownerId: params.ownerId,
      data: params.data,
    });
  }
}
