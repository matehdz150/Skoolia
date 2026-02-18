import { AuthModule } from 'src/auth/auth.module';
import { SCHOOL_REPOSITORY } from './core/ports/tokens';
import { AssignSchoolCategoriesUseCase } from './core/use-cases/assign-school-categories.use-case';
import { CreateSchoolUseCase } from './core/use-cases/create-school.use-case';
import { GetMySchoolUseCase } from './core/use-cases/get-my-school.use-case';
import { UpdateSchoolUseCase } from './core/use-cases/update-school.use-case';
import { GetSchoolByIdUseCase } from './core/use-cases/get-school-by-id.use-case';
import { DrizzleSchoolRepository } from './infrastructure/adapters/drizzle-school.repository';
import { SchoolsController } from './application/schools.controller';
import { DbModule } from 'src/db/db.module';
import { Module, forwardRef } from '@nestjs/common';
import { SchoolsFeedResolver } from './application/graphql/school-feed.resolver';
import { ListSchoolsFeedUseCase } from './core/use-cases/list-schools.use-case';
import { FavoritesModule } from './favorites.module';

@Module({
  imports: [
    DbModule, 
    AuthModule,
    forwardRef(() => FavoritesModule),
  ],
  controllers: [SchoolsController],
  providers: [
    CreateSchoolUseCase,
    GetMySchoolUseCase,
    UpdateSchoolUseCase,
    GetSchoolByIdUseCase,
    AssignSchoolCategoriesUseCase,
    DrizzleSchoolRepository,
    SchoolsFeedResolver,
    ListSchoolsFeedUseCase,
    {
      provide: SCHOOL_REPOSITORY,
      useClass: DrizzleSchoolRepository,
    },
  ],
  exports: [SCHOOL_REPOSITORY],
})
export class SchoolsModule {}
