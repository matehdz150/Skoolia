import { Inject, Injectable } from '@nestjs/common';
import { categories } from 'drizzle/schemas/schools/school-categories';
import { Category } from 'src/categories/core/entities/category.entity';
import { CategoryRepository } from 'src/categories/core/ports/categories.repository';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';

@Injectable()
export class DrizzleCategoriesRepository implements CategoryRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}
  async findAll(): Promise<Category[]> {
    return this.db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .orderBy(categories.name);
  }
}
