import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

import { SCHOOL_RATINGS_REPOSITORY } from './core/ports/tokens';
import { DrizzleSchoolRatingsRepository } from './infraestructure/adapters/drizzle-school-ratings.repository';

import { UpsertSchoolRatingUseCase } from './core/use-cases/upsert-school-rating.use-case';
import { SchoolRatingsController } from './application/ratings.controller';
import { DeleteSchoolRatingUseCase } from './core/use-cases/delete-rating.use-case';
import { ListSchoolRatingsUseCase } from './core/use-cases/list-school-ratings.use-case';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [SchoolRatingsController],
  providers: [
    UpsertSchoolRatingUseCase,
    DeleteSchoolRatingUseCase,
    ListSchoolRatingsUseCase,
    {
      provide: SCHOOL_RATINGS_REPOSITORY,
      useClass: DrizzleSchoolRatingsRepository,
    },
  ],
})
export class RatingsModule {}
