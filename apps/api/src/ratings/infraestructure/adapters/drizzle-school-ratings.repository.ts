import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

import { DATABASE } from 'src/db/db.module';
import type { Database } from 'src/db/db.types';

import { schools, schoolRatings } from 'drizzle/schemas';
import type { SchoolRatingsRepository } from '../../core/ports/school-ratings.repository';
import type { SchoolRating } from '../../core/entities/school-rating.types';

@Injectable()
export class DrizzleSchoolRatingsRepository implements SchoolRatingsRepository {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async findSchoolById(schoolId: string) {
    const rows = await this.db
      .select({ id: schools.id })
      .from(schools)
      .where(eq(schools.id, schoolId))
      .limit(1);

    return rows[0] ?? null;
  }

  async findByUserAndSchool(params: {
    publicUserId: string;
    schoolId: string;
  }) {
    const rows = await this.db
      .select()
      .from(schoolRatings)
      .where(
        and(
          eq(schoolRatings.publicUserId, params.publicUserId),
          eq(schoolRatings.schoolId, params.schoolId),
        ),
      )
      .limit(1);

    return (rows[0] ?? null) as SchoolRating | null;
  }

  async upsert(params: {
    publicUserId: string;
    schoolId: string;
    rating: number;
    comment?: string;
  }) {
    // drizzle: insert ... on conflict do update
    const [row] = await this.db
      .insert(schoolRatings)
      .values({
        publicUserId: params.publicUserId,
        schoolId: params.schoolId,
        rating: params.rating,
        comment: params.comment ?? null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schoolRatings.schoolId, schoolRatings.publicUserId],
        set: {
          rating: params.rating,
          comment: params.comment ?? null,
          updatedAt: new Date(),
        },
      })
      .returning();

    return row as SchoolRating;
  }

  async remove(params: { publicUserId: string; schoolId: string }) {
    await this.db
      .delete(schoolRatings)
      .where(
        and(
          eq(schoolRatings.publicUserId, params.publicUserId),
          eq(schoolRatings.schoolId, params.schoolId),
        ),
      );
  }

  async listBySchool(params: {
    schoolId: string;
    limit: number;
    offset: number;
  }) {
    const rows = await this.db
      .select()
      .from(schoolRatings)
      .where(eq(schoolRatings.schoolId, params.schoolId))
      .orderBy(sql`${schoolRatings.createdAt} desc`)
      .limit(params.limit)
      .offset(params.offset);

    return rows as SchoolRating[];
  }

  async recalcSchoolRatingStats(schoolId: string) {
    // 1) agregados
    const [agg] = await this.db
      .select({
        avg: sql<number>`coalesce(avg(${schoolRatings.rating}), 0)`,
        count: sql<number>`count(*)`,
      })
      .from(schoolRatings)
      .where(eq(schoolRatings.schoolId, schoolId));

    // 2) persistir en schools
    await this.db
      .update(schools)
      .set({
        averageRating: agg?.avg ?? 0,
        ratingsCount: agg?.count ?? 0,
        updatedAt: new Date(),
      })
      .where(eq(schools.id, schoolId));
  }
}
