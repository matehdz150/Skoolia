import { Inject, NotFoundException } from '@nestjs/common';
import { SCHOOL_RATINGS_REPOSITORY } from '../ports/tokens';
import type { SchoolRatingsRepository } from '../ports/school-ratings.repository';

export class ListSchoolRatingsUseCase {
  constructor(
    @Inject(SCHOOL_RATINGS_REPOSITORY)
    private readonly ratingsRepo: SchoolRatingsRepository,
  ) {}

  async execute(params: {
    schoolId: string;
    page?: number;
    pageSize?: number;
  }) {
    const school = await this.ratingsRepo.findSchoolById(params.schoolId);
    if (!school) throw new NotFoundException('School not found');

    const pageSize = Math.min(Math.max(params.pageSize ?? 10, 1), 50);
    const page = Math.max(params.page ?? 1, 1);

    return this.ratingsRepo.listBySchool({
      schoolId: params.schoolId,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }
}
