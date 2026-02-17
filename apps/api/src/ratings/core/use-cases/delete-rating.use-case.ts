import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';
import { SCHOOL_RATINGS_REPOSITORY } from '../ports/tokens';
import type { SchoolRatingsRepository } from '../ports/school-ratings.repository';

export class DeleteSchoolRatingUseCase {
  constructor(
    @Inject(SCHOOL_RATINGS_REPOSITORY)
    private readonly ratingsRepo: SchoolRatingsRepository,
  ) {}

  async execute(user: JwtPayload, schoolId: string) {
    if (user.role !== 'public') throw new ForbiddenException();

    const school = await this.ratingsRepo.findSchoolById(schoolId);
    if (!school) throw new NotFoundException('School not found');

    await this.ratingsRepo.remove({ publicUserId: user.sub, schoolId });
    await this.ratingsRepo.recalcSchoolRatingStats(schoolId);

    return { success: true };
  }
}
