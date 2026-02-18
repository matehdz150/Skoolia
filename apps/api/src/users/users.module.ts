import { Module } from '@nestjs/common';

import { UsersController } from './application/users.controller';

import { GetMyProfileUseCase } from './core/use-cases/get-my-profile.use-case';
import { UpdateMyProfileUseCase } from './core/use-cases/update-profile.use-case';

import { USER_REPOSITORY } from './core/ports/tokens';
import { DrizzleUserRepository } from './infrstructure/adapters/drizzle-user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], // 🔥 SOLO IMPORTAS
  controllers: [UsersController],
  providers: [
    GetMyProfileUseCase,
    UpdateMyProfileUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository,
    },
  ],
})
export class UsersModule {}
