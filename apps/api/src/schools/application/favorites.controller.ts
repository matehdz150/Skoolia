import {
  Controller,
  // Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { ToggleFavoriteUseCase } from '../core/use-cases/toggle-favorite.use-case';

@Controller('schools')
export class FavoritesController {
  constructor(
    @Inject(ToggleFavoriteUseCase)
    private readonly toggleFavoriteUseCase: ToggleFavoriteUseCase,
  ) {}

  /**
   * ❤️ Toggle favorite
   * POST /schools/:id/favorite
   */
  @Post(':id/favorite')
  @UseGuards(AuthGuard)
  async toggle(@Param('id') schoolId: string, @CurrentUser() user: JwtPayload) {
    return this.toggleFavoriteUseCase.execute(user, schoolId);
  }

  /**
   * 📄 List favorites of current user
   * GET /schools/favorites
   */
}
