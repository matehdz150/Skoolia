// core/use-cases/update-student.use-case.ts

import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../ports/tokens';
import type { StudentRepository } from '../ports/student.repository';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class UpdateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly repository: StudentRepository,
  ) {}

  async execute(
    user: JwtPayload,
    data: {
      name?: string;
      age?: number;
      monthlyBudget?: number;
      categoryIds?: string[];
    },
  ) {
    if (user.role !== 'public') {
      throw new ForbiddenException();
    }

    const existing = await this.repository.findByPublicUserId(user.sub);

    if (!existing) {
      throw new NotFoundException('Student not found');
    }

    return this.repository.update(existing.id, data);
  }
}
