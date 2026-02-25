import { Module } from '@nestjs/common';

import { CategoriesController } from './application/categories.controller';

import { GetAllCategoriesUseCase } from './core/use-cases/get-all-categories';

import { CATEGORY_REPOSITORY } from './core/ports/tokens';
import { DrizzleCategoriesRepository } from './infrastructure/adapters/drizzle-categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    // Use case
    GetAllCategoriesUseCase,

    // Repository binding
    {
      provide: CATEGORY_REPOSITORY,
      useClass: DrizzleCategoriesRepository,
    },
  ],
  exports: [GetAllCategoriesUseCase],
})
export class CategoriesModule {}
