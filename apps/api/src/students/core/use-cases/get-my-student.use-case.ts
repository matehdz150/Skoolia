import { Inject } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../ports/tokens';
import * as studentRepository from '../ports/student.repository';
import { JwtPayload } from 'src/auth/core/types/jwt-payload';

export class GetMyStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly repository: studentRepository.StudentRepository,
  ) {}

  async execute(user: JwtPayload) {
    return this.repository.findByPublicUserId(user.sub);
  }
}
