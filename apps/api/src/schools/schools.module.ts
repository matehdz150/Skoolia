import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';

import { SchoolsController } from './application/schools.controller';

import { CreateSchoolUseCase } from './core/use-cases/create-school.use-case';
import { GetMySchoolUseCase } from './core/use-cases/get-my-school.use-case';

import { DrizzleSchoolRepository } from './infrastructure/adapters/drizzle-school.repository';
import { SCHOOL_REPOSITORY } from './core/ports/tokens';
import { AuthModule } from 'src/auth/auth.module';
import { UpdateSchoolUseCase } from './core/use-cases/update-school.use-case';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [SchoolsController],
  providers: [
    CreateSchoolUseCase,
    GetMySchoolUseCase,
    DrizzleSchoolRepository,
    UpdateSchoolUseCase,
    {
      provide: SCHOOL_REPOSITORY,
      useClass: DrizzleSchoolRepository,
    },
  ],
})
export class SchoolsModule {}
