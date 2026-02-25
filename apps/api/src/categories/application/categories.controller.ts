import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllCategoriesUseCase } from '../core/use-cases/get-all-categories';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(GetAllCategoriesUseCase)
    private readonly getAllCategories: GetAllCategoriesUseCase,
  ) {}

  @Get()
  async getAll() {
    return this.getAllCategories.execute();
  }
}
