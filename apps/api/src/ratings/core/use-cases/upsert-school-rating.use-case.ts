import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';
import { SCHOOL_RATINGS_REPOSITORY } from '../ports/tokens';
import type { SchoolRatingsRepository } from '../ports/school-ratings.repository';

export class UpsertSchoolRatingUseCase {
  constructor(
    @Inject(SCHOOL_RATINGS_REPOSITORY)
    private readonly ratingsRepo: SchoolRatingsRepository,
  ) {}

  async execute(
    user: JwtPayload,
    params: { schoolId: string; rating: number; comment?: string },
  ) {
    if (user.role !== 'public') throw new ForbiddenException();

    if (params.rating < 1 || params.rating > 5) {
      throw new ForbiddenException('Rating must be between 1 and 5');
    }

    const school = await this.ratingsRepo.findSchoolById(params.schoolId);
    if (!school) throw new NotFoundException('School not found');

    const saved = await this.ratingsRepo.upsert({
      publicUserId: user.sub,
      schoolId: params.schoolId,
      rating: params.rating,
      comment: params.comment,
    });

    // mantener averageRating + ratingsCount consistentes
    await this.ratingsRepo.recalcSchoolRatingStats(params.schoolId);

    return saved;
  }
}
