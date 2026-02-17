import { DbModule } from 'src/db/db.module';
import { AddFavoriteUseCase } from './core/use-cases/add-favorite.use-case';
import { ToggleFavoriteUseCase } from './core/use-cases/toggle-favorite.use-case';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesController } from './application/favorites.controller';
import { DrizzleFavoritesRepository } from './infrastructure/adapters/drizzle-favorites.repository';
import { FAVORITES_REPOSITORY } from './core/ports/tokens';
import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools.module';

@Module({
  imports: [DbModule, AuthModule, SchoolsModule],
  controllers: [FavoritesController],
  providers: [
    AddFavoriteUseCase,
    ToggleFavoriteUseCase,
    DrizzleFavoritesRepository,
    {
      provide: FAVORITES_REPOSITORY,
      useClass: DrizzleFavoritesRepository,
    },
  ],
  exports: [FAVORITES_REPOSITORY],
})
export class FavoritesModule {}
