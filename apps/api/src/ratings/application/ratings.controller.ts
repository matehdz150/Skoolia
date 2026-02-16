import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { UpsertSchoolRatingDto } from './dto/upsert-school-rating.dto';
import { UpsertSchoolRatingUseCase } from '../core/use-cases/upsert-school-rating.use-case';
import { DeleteSchoolRatingUseCase } from '../core/use-cases/delete-rating.use-case';
import { ListSchoolRatingsUseCase } from '../core/use-cases/list-school-ratings.use-case';

@Controller('schools/:schoolId/ratings')
export class SchoolRatingsController {
  constructor(
    @Inject(UpsertSchoolRatingUseCase)
    private readonly upsertRating: UpsertSchoolRatingUseCase,

    @Inject(DeleteSchoolRatingUseCase)
    private readonly deleteRating: DeleteSchoolRatingUseCase,

    @Inject(ListSchoolRatingsUseCase)
    private readonly listRatings: ListSchoolRatingsUseCase,
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

  /**
   * 📜 Listar ratings de la escuela
   * GET /schools/:schoolId/ratings?page=1&pageSize=10
   */
  @Get()
  async list(
    @Param('schoolId') schoolId: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.listRatings.execute({
      schoolId,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }
}
