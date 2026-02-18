import { Inject } from '@nestjs/common';

import { categories, students } from 'drizzle/schemas';
import { studentInterests } from 'drizzle/schemas';
import { eq } from 'drizzle-orm';
import type { StudentRepository } from '../../core/ports/student.repository';
import type {
  Student,
  StudentWithInterests,
} from '../../core/entities/student';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';

export class DrizzleStudentRepository implements StudentRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async findByPublicUserId(
    publicUserId: string,
  ): Promise<StudentWithInterests | null> {
    // 1️⃣ Buscar student
    const result = await this.db
      .select()
      .from(students)
      .where(eq(students.publicUserId, publicUserId))
      .limit(1);

    if (!result.length) return null;

    const student = result[0];

    // 2️⃣ Traer intereses con join
    const interests = await this.db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(studentInterests)
      .innerJoin(categories, eq(studentInterests.categoryId, categories.id))
      .where(eq(studentInterests.studentId, student.id));

    return {
      ...student,
      interests,
    };
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

  async delete(studentId: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(studentInterests)
        .where(eq(studentInterests.studentId, studentId));

      await tx.delete(students).where(eq(students.id, studentId));
    });
  }
}
