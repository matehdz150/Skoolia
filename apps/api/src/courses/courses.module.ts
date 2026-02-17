import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { AuthModule } from 'src/auth/auth.module';

import { CoursesController } from './application/courses.controller';

import { CreateCourseUseCase } from './core/use-cases/create-course.use-case';

import { COURSE_REPOSITORY } from './core/ports/tokens';
import { DrizzleCourseRepository } from './infrastructure/adapters/drizzle-course.repository';
import { UpdateCourseUseCase } from './core/use-cases/update-course.use-case';
import { DeleteCourseUseCase } from './core/use-cases/delete-course.use-case';

@Module({
  imports: [
    DbModule, // 🔌 acceso a DB
    SchoolsModule, // 🔗 porque CreateCourseUseCase usa SCHOOL_REPOSITORY
    AuthModule, // 🔐 para guards
  ],
  controllers: [CoursesController],
  providers: [
    CreateCourseUseCase,
    DrizzleCourseRepository,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    {
      provide: COURSE_REPOSITORY,
      useClass: DrizzleCourseRepository,
    },
  ],
})
export class CoursesModule {}
