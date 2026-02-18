import { Inject, NotFoundException } from '@nestjs/common';
import { SCHOOL_REPOSITORY } from '../ports/tokens';
import type { SchoolRepository } from '../ports/school.repository';

export class GetSchoolByIdUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(params: { id: string }) {
    const school = await this.schoolRepository.findById(params.id);
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }
}
