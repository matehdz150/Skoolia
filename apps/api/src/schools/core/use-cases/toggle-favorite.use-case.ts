import { ForbiddenException, Inject } from '@nestjs/common';
import { FAVORITES_REPOSITORY } from '../ports/tokens';
import type { FavoritesRepository } from '../ports/favorites.repository';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class ToggleFavoriteUseCase {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async execute(user: JwtPayload, schoolId: string) {
    if (user.role !== 'public') {
      throw new ForbiddenException();
    }

    const exists = await this.favoritesRepository.existsByUserAndSchool({
      publicUserId: user.sub,
      schoolId,
    });

    if (exists) {
      await this.favoritesRepository.remove({
        publicUserId: user.sub,
        schoolId,
      });

      return { isFavorite: false };
    }

    await this.favoritesRepository.add({
      publicUserId: user.sub,
      schoolId,
    });

    return { isFavorite: true };
  }
}
