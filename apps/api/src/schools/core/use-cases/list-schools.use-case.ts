import { Inject } from '@nestjs/common';
import { SCHOOL_REPOSITORY } from '../ports/tokens';
import type { SchoolRepository } from '../ports/school.repository';

export class ListSchoolsFeedUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async execute(filters: {
    city?: string;
    categoryId?: string;
    search?: string;
    sortBy?: 'favorites' | 'rating' | 'recent';
    onlyVerified?: boolean;
  }) {
    return this.schoolRepository.listForFeed(filters);
  }
}
