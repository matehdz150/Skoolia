import { AuthModule } from 'src/auth/auth.module';
import { SCHOOL_REPOSITORY } from './core/ports/tokens';
import { AssignSchoolCategoriesUseCase } from './core/use-cases/assign-school-categories.use-case';
import { CreateSchoolUseCase } from './core/use-cases/create-school.use-case';
import { GetMySchoolUseCase } from './core/use-cases/get-my-school.use-case';
import { UpdateSchoolUseCase } from './core/use-cases/update-school.use-case';
import { DrizzleSchoolRepository } from './infrastructure/adapters/drizzle-school.repository';
import { SchoolsController } from './application/schools.controller';
import { DbModule } from 'src/db/db.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [SchoolsController],
  providers: [
    CreateSchoolUseCase,
    GetMySchoolUseCase,
    UpdateSchoolUseCase,
    AssignSchoolCategoriesUseCase,
    DrizzleSchoolRepository,
    {
      provide: SCHOOL_REPOSITORY,
      useClass: DrizzleSchoolRepository,
    },
  ],
  exports: [SCHOOL_REPOSITORY],
})
export class SchoolsModule {}
