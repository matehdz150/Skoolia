import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

import { STUDENT_REPOSITORY } from './core/ports/tokens';
import { CreateStudentUseCase } from './core/use-cases/create-student.use-case';
import { StudentsController } from './application/students.controller';
import { DrizzleStudentRepository } from './infraestructure/adapters/drizzle-students.repository';
import { UpdateStudentUseCase } from './core/use-cases/update-student.use-case';
import { GetMyStudentUseCase } from './core/use-cases/get-my-student.use-case';
import { DeleteStudentUseCase } from './core/use-cases/delete-student.use-case';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [StudentsController],
  providers: [
    CreateStudentUseCase,
    UpdateStudentUseCase,
    GetMyStudentUseCase,
    DeleteStudentUseCase,
    {
      provide: STUDENT_REPOSITORY,
      useClass: DrizzleStudentRepository,
    },
  ],
})
export class StudentsModule {}
