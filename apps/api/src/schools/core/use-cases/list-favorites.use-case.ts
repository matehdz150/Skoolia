import { Inject, Injectable } from '@nestjs/common';
import { FAVORITES_REPOSITORY } from '../ports/tokens';
import type { FavoritesRepository } from '../ports/favorites.repository';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

@Injectable()
export class ListFavoritesUseCase {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async execute(user: JwtPayload) {
    return this.favoritesRepository.listForUser(user.sub);
  }
}
