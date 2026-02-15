import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { schools } from 'drizzle/schemas';

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
}
