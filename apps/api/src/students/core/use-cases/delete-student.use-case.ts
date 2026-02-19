import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../ports/tokens';
import type { StudentRepository } from '../ports/student.repository';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class DeleteStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly repository: StudentRepository,
  ) {}

  async execute(user: JwtPayload) {
    if (user.role !== 'public') {
      throw new ForbiddenException();
    }

    const existing = await this.repository.findByPublicUserId(user.sub);

    if (!existing) {
      throw new NotFoundException('Student not found');
    }

    await this.repository.delete(existing.id);
  }
}
