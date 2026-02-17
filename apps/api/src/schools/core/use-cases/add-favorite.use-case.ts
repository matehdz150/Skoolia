import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';

import { FAVORITES_REPOSITORY, SCHOOL_REPOSITORY } from '../ports/tokens';
import type { FavoritesRepository } from '../ports/favorites.repository';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';
import * as schoolRepository from '../ports/school.repository';

export class AddFavoriteUseCase {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: FavoritesRepository,

    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: schoolRepository.SchoolRepository,
  ) {}

  async execute(user: JwtPayload, schoolId: string) {
    if (user.role !== 'public') {
      throw new ForbiddenException();
    }

    const school = await this.schoolRepository.findById(schoolId);

    if (!school) {
      throw new NotFoundException('School not found');
    }

    const exists = await this.favoritesRepository.existsByUserAndSchool({
      publicUserId: user.sub,
      schoolId,
    });

    if (exists) return;

    await this.favoritesRepository.add({
      publicUserId: user.sub,
      schoolId,
    });
  }
}
