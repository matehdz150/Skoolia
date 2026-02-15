import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { schools } from 'drizzle/schemas';
import { schoolFavorites } from 'drizzle/schemas/schools/school-favorites';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';
import { FavoritesRepository } from 'src/schools/core/ports/favorites.repository';

@Injectable()
export class DrizzleFavoritesRepository implements FavoritesRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async existsByUserAndSchool(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<boolean> {
    const rows = await this.db
      .select({ id: schoolFavorites.id })
      .from(schoolFavorites)
      .where(
        and(
          eq(schoolFavorites.publicUserId, params.publicUserId),
          eq(schoolFavorites.schoolId, params.schoolId),
        ),
      )
      .limit(1);

    return !!rows[0];
  }

  async add(params: { publicUserId: string; schoolId: string }): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.insert(schoolFavorites).values({
        publicUserId: params.publicUserId,
        schoolId: params.schoolId,
      });

      await tx
        .update(schools)
        .set({
          favoritesCount: sql`${schools.favoritesCount} + 1`,
        })
        .where(eq(schools.id, params.schoolId));
    });
  }

  async remove(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(schoolFavorites)
        .where(
          and(
            eq(schoolFavorites.publicUserId, params.publicUserId),
            eq(schoolFavorites.schoolId, params.schoolId),
          ),
        );

      await tx
        .update(schools)
        .set({
          favoritesCount: sql`GREATEST(${schools.favoritesCount} - 1, 0)`,
        })
        .where(eq(schools.id, params.schoolId));
    });
  }
}
