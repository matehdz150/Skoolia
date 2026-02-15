import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { UpsertSchoolRatingDto } from './dto/upsert-school-rating.dto';
import { UpsertSchoolRatingUseCase } from '../core/use-cases/upsert-school-rating.use-case';
import { DeleteSchoolRatingUseCase } from '../core/use-cases/delete-rating.use-case';

@Controller('schools/:schoolId/ratings')
export class SchoolRatingsController {
  constructor(
    @Inject(UpsertSchoolRatingUseCase)
    private readonly upsertRating: UpsertSchoolRatingUseCase,

    @Inject(DeleteSchoolRatingUseCase)
    private readonly deleteRating: DeleteSchoolRatingUseCase,
  ) {}

  /**
   * ⭐ Crear/Actualizar MI rating
   * POST /schools/:schoolId/ratings
   */
  @Post()
  @UseGuards(AuthGuard)
  async upsert(
    @Param('schoolId') schoolId: string,
    @Body() dto: UpsertSchoolRatingDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.upsertRating.execute(user, {
      schoolId,
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  /**
   * 🗑️ Borrar MI rating
   * DELETE /schools/:schoolId/ratings
   */
  @Delete()
  @UseGuards(AuthGuard)
  async remove(
    @Param('schoolId') schoolId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.deleteRating.execute(user, schoolId);
  }
}
