import { Inject } from '@nestjs/common';

import { students } from 'drizzle/schemas';
import { studentInterests } from 'drizzle/schemas';
import { eq } from 'drizzle-orm';
import type { StudentRepository } from '../../core/ports/student.repository';
import type { Student } from '../../core/entities/student';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';

export class DrizzleStudentRepository implements StudentRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async findByPublicUserId(publicUserId: string): Promise<Student | null> {
    const result = await this.db
      .select()
      .from(students)
      .where(eq(students.publicUserId, publicUserId))
      .limit(1);

    if (!result.length) return null;

    return result[0];
  }

  async create(data: {
    publicUserId: string;
    name: string;
    age: number;
    monthlyBudget?: number;
    categoryIds: string[];
  }): Promise<Student> {
    return await this.db.transaction(async (tx) => {
      // 1️⃣ Crear student
      const [student] = await tx
        .insert(students)
        .values({
          publicUserId: data.publicUserId,
          name: data.name,
          age: data.age,
          monthlyBudget: data.monthlyBudget ?? null,
        })
        .returning();

      // 2️⃣ Insertar intereses
      if (data.categoryIds.length > 0) {
        await tx.insert(studentInterests).values(
          data.categoryIds.map((categoryId) => ({
            studentId: student.id,
            categoryId,
          })),
        );
      }

      return student;
    });
  }

  async update(
    studentId: string,
    data: {
      name?: string;
      age?: number;
      monthlyBudget?: number;
      categoryIds?: string[];
    },
  ): Promise<Student> {
    return await this.db.transaction(async (tx) => {
      // 1️⃣ Update base info
      const [updated] = await tx
        .update(students)
        .set({
          name: data.name,
          age: data.age,
          monthlyBudget:
            data.monthlyBudget !== undefined ? data.monthlyBudget : undefined,
        })
        .where(eq(students.id, studentId))
        .returning();

      // 2️⃣ Si mandaron categorías → reemplazarlas
      if (data.categoryIds) {
        // borrar existentes
        await tx
          .delete(studentInterests)
          .where(eq(studentInterests.studentId, studentId));

        // insertar nuevas
        if (data.categoryIds.length > 0) {
          await tx.insert(studentInterests).values(
            data.categoryIds.map((categoryId) => ({
              studentId,
              categoryId,
            })),
          );
        }
      }

      return updated;
    });
  }
}
