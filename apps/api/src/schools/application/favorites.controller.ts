import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { ToggleFavoriteUseCase } from '../core/use-cases/toggle-favorite.use-case';
import { ListFavoritesUseCase } from '../core/use-cases/list-favorites.use-case';

@Controller('favorites')
export class FavoritesController {
  constructor(
    @Inject(ToggleFavoriteUseCase)
    private readonly toggleFavoriteUseCase: ToggleFavoriteUseCase,

    @Inject(ListFavoritesUseCase)
    private readonly listFavorites: ListFavoritesUseCase,
  ) {}

  /**
   * ❤️ Toggle favorite
   * POST /schools/:id/favorite
   */
  @Post(':id')
  @UseGuards(AuthGuard)
  async toggle(@Param('id') schoolId: string, @CurrentUser() user: JwtPayload) {
    return this.toggleFavoriteUseCase.execute(user, schoolId);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getFavorites(@CurrentUser() user: JwtPayload) {
    return this.listFavorites.execute(user);
  }
}
