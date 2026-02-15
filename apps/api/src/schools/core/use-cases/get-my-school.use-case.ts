import { Inject, ForbiddenException } from '@nestjs/common';
import type { SchoolRepository } from '../ports/school.repository';
import { SCHOOL_REPOSITORY } from '../ports/tokens';

export class GetMySchoolUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: { ownerId: string; role: 'public' | 'private' }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    return this.schoolRepository.findByOwner(params.ownerId);
  }
}
