import { Inject } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../ports/tokens';
import type { StudentRepository } from '../ports/student.repository';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class CreateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly repository: StudentRepository,
  ) {}

  async execute(
    user: JwtPayload,
    data: {
      name: string;
      age: number;
      monthlyBudget?: number;
      categoryIds: string[];
    },
  ) {
    if (user.role !== 'public') {
      throw new Error('Only public users can create a student');
    }

    const existing = await this.repository.findByPublicUserId(user.sub);

    if (existing) {
      throw new Error('Student already exists for this user');
    }

    return this.repository.create({
      publicUserId: user.sub,
      ...data,
    });
  }
}
