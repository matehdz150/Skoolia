import { Inject, ForbiddenException } from '@nestjs/common';
import * as favoritesRepository_1 from '../ports/favorites.repository';
import { FAVORITES_REPOSITORY } from '../ports/tokens';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class AddFavoriteUseCase {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: favoritesRepository_1.FavoritesRepository,
  ) {}

  async execute(user: JwtPayload, schoolId: string) {
    if (user.role !== 'public') {
      throw new ForbiddenException();
    }

    await this.favoritesRepository.add({
      publicUserId: user.sub,
      schoolId,
    });
  }
}
