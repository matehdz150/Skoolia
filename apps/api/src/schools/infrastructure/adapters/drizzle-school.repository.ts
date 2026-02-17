import { Inject, Injectable } from '@nestjs/common';
import { schoolCategories, schools } from 'drizzle/schemas';
import { and, eq, ilike, desc, lt, SQL } from 'drizzle-orm';

import { DATABASE } from 'src/db/db.module';
import type { Database } from 'src/db/db.types';

import type { SchoolRepository } from '../../core/ports/school.repository';
import { School } from 'src/schools/core/entities/school.types';
import {
  SchoolEdge,
  SchoolsConnection,
} from 'src/schools/core/entities/schools-connection';

function encodeCursor(date: Date): string {
  return Buffer.from(date.toISOString()).toString('base64');
}

function decodeCursor(cursor: string): Date {
  const decoded = Buffer.from(cursor, 'base64').toString('ascii');
  return new Date(decoded);
}

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

  async listForFeed(params: {
    filters?: {
      city?: string;
      categoryId?: string;
      search?: string;
      sortBy?: 'favorites' | 'rating' | 'recent';
      onlyVerified?: boolean;
    };
    pagination?: {
      first: number;
      after?: string;
    };
  }): Promise<SchoolsConnection> {
    const { filters = {}, pagination } = params;

    const whereConditions: SQL[] = [];

    if (filters.city) {
      whereConditions.push(eq(schools.city, filters.city));
    }

    if (filters.onlyVerified) {
      whereConditions.push(eq(schools.isVerified, true));
    }

    if (filters.search) {
      whereConditions.push(ilike(schools.name, `%${filters.search}%`));
    }

    if (pagination?.after) {
      const cursorDate = decodeCursor(pagination.after);
      whereConditions.push(lt(schools.createdAt, cursorDate));
    }

    // 🔥 Construcción dinámica SIN romper tipos
    const queryBuilder = this.db.select({
      id: schools.id,
      name: schools.name,
      description: schools.description,

      logoUrl: schools.logoUrl,
      coverImageUrl: schools.coverImageUrl,

      address: schools.address,
      city: schools.city,
      latitude: schools.latitude,
      longitude: schools.longitude,

      educationalLevel: schools.educationalLevel,
      institutionType: schools.institutionType,
      schedule: schools.schedule,
      languages: schools.languages,
      maxStudentsPerClass: schools.maxStudentsPerClass,
      enrollmentYear: schools.enrollmentYear,
      enrollmentOpen: schools.enrollmentOpen,
      monthlyPrice: schools.monthlyPrice,

      averageRating: schools.averageRating,
      ratingsCount: schools.ratingsCount,
      favoritesCount: schools.favoritesCount,
      rankingScore: schools.rankingScore,

      isFeatured: schools.isFeatured,
      isVerified: schools.isVerified,

      ownerId: schools.ownerId,
      createdAt: schools.createdAt,
      updatedAt: schools.updatedAt,
    });

    const fromBuilder = filters.categoryId
      ? queryBuilder
          .from(schools)
          .innerJoin(
            schoolCategories,
            eq(schoolCategories.schoolId, schools.id),
          )
      : queryBuilder.from(schools);

    const whereBuilder =
      whereConditions.length > 0
        ? fromBuilder.where(and(...whereConditions))
        : fromBuilder;

    const orderedBuilder =
      filters.sortBy === 'favorites'
        ? whereBuilder.orderBy(desc(schools.favoritesCount))
        : filters.sortBy === 'rating'
          ? whereBuilder.orderBy(desc(schools.averageRating))
          : whereBuilder.orderBy(desc(schools.createdAt));

    const limit = pagination?.first ?? 10;

    const rows = await orderedBuilder.limit(limit + 1);

    const hasNextPage = rows.length > limit;
    const sliced = hasNextPage ? rows.slice(0, limit) : rows;

    const edges: SchoolEdge[] = sliced.map((row) => ({
      node: row,
      cursor: encodeCursor(row.createdAt),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor:
          sliced.length > 0
            ? encodeCursor(sliced[sliced.length - 1].createdAt)
            : null,
      },
    };
  }
}
