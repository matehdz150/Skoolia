import { Inject, Injectable } from '@nestjs/common';
import { schoolCategories, schools } from 'drizzle/schemas';
import { and, eq, ilike, desc, type SQL } from 'drizzle-orm';

import { DATABASE } from 'src/db/db.module';
import type { Database } from 'src/db/db.types';

import type { SchoolRepository } from '../../core/ports/school.repository';
import { School } from 'src/schools/core/types/school.types';

@Injectable()
export class DrizzleSchoolRepository implements SchoolRepository {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async create(params: {
    name: string;
    description?: string;
    ownerId: string;
  }) {
    const [school] = await this.db
      .insert(schools)
      .values({
        name: params.name,
        description: params.description,
        ownerId: params.ownerId,
      })
      .returning();

    return school;
  }

  async findByOwner(ownerId: string) {
    const rows = await this.db
      .select()
      .from(schools)
      .where(eq(schools.ownerId, ownerId))
      .limit(1);

    return rows[0] ?? null;
  }

  async findById(id: string) {
    const rows = await this.db
      .select()
      .from(schools)
      .where(eq(schools.id, id))
      .limit(1);

    return rows[0] ?? null;
  }

  async list() {
    return this.db.select().from(schools);
  }

  async update(params: { ownerId: string; data: Partial<School> }) {
    const [updated] = await this.db
      .update(schools)
      .set({
        ...params.data,
        updatedAt: new Date(),
      })
      .where(eq(schools.ownerId, params.ownerId))
      .returning();

    return updated;
  }

  async assignCategories(
    schoolId: string,
    categoryIds: string[],
  ): Promise<void> {
    // borrar actuales
    await this.db
      .delete(schoolCategories)
      .where(eq(schoolCategories.schoolId, schoolId));

    if (!categoryIds.length) return;

    await this.db.insert(schoolCategories).values(
      categoryIds.map((categoryId) => ({
        schoolId,
        categoryId,
      })),
    );
  }

  async listForFeed(filters: {
    city?: string;
    categoryId?: string;
    search?: string;
    sortBy?: 'favorites' | 'rating' | 'recent';
    onlyVerified?: boolean;
  }): Promise<School[]> {
    const conditions: SQL[] = [];

    if (filters.city) {
      conditions.push(eq(schools.city, filters.city));
    }

    if (filters.onlyVerified) {
      conditions.push(eq(schools.isVerified, true));
    }

    if (filters.search) {
      conditions.push(ilike(schools.name, `%${filters.search}%`));
    }

    const baseWhere = conditions.length > 0 ? and(...conditions) : undefined;

    // 🔥 CASO 1: filtro por categoría
    if (filters.categoryId) {
      const rows = await this.db
        .select({
          id: schools.id,
          name: schools.name,
          description: schools.description,
          logoUrl: schools.logoUrl,
          coverImageUrl: schools.coverImageUrl,
          address: schools.address,
          city: schools.city,
          latitude: schools.latitude,
          longitude: schools.longitude,
          averageRating: schools.averageRating,
          favoritesCount: schools.favoritesCount,
          isVerified: schools.isVerified,
          ownerId: schools.ownerId,
          createdAt: schools.createdAt,
          updatedAt: schools.updatedAt,
        })
        .from(schools)
        .innerJoin(schoolCategories, eq(schoolCategories.schoolId, schools.id))
        .where(
          and(
            eq(schoolCategories.categoryId, filters.categoryId),
            ...(baseWhere ? [baseWhere] : []),
          ),
        )
        .orderBy(
          filters.sortBy === 'favorites'
            ? desc(schools.favoritesCount)
            : filters.sortBy === 'rating'
              ? desc(schools.averageRating)
              : filters.sortBy === 'recent'
                ? desc(schools.createdAt)
                : desc(schools.createdAt),
        );

      return rows as School[];
    }

    // 🔥 CASO 2: sin categoría
    const rows = await this.db
      .select()
      .from(schools)
      .where(baseWhere)
      .orderBy(
        filters.sortBy === 'favorites'
          ? desc(schools.favoritesCount)
          : filters.sortBy === 'rating'
            ? desc(schools.averageRating)
            : filters.sortBy === 'recent'
              ? desc(schools.createdAt)
              : desc(schools.createdAt),
      );

    return rows;
  }
}
