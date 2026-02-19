import { DbModule } from 'src/db/db.module';
import { ToggleFavoriteUseCase } from './core/use-cases/toggle-favorite.use-case';
import { AddFavoriteUseCase } from './core/use-cases/add-favorite.use-case';
import { ListFavoritesUseCase } from './core/use-cases/list-favorites.use-case';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesController } from './application/favorites.controller';
import { DrizzleFavoritesRepository } from './infrastructure/adapters/drizzle-favorites.repository';
import { FAVORITES_REPOSITORY } from './core/ports/tokens';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [FavoritesController],
  providers: [
    AddFavoriteUseCase,
    ToggleFavoriteUseCase,
    ListFavoritesUseCase,
    DrizzleFavoritesRepository,
    ListFavoritesUseCase,
    {
      provide: FAVORITES_REPOSITORY,
      useClass: DrizzleFavoritesRepository,
    },
  ],
  exports: [FAVORITES_REPOSITORY, ListFavoritesUseCase],
})
export class FavoritesModule {}
