import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

import { MessagesController } from './application/messages.controller';

import { MESSAGE_REPOSITORY } from './core/ports/tokens';
import { DrizzleMessageRepository } from './infrastructure/adapters/drizzle-message.repository';

import { CreateParentMessageUseCase } from './core/use-cases/create-parent-message.use-case';
import { ListParentThreadsUseCase } from './core/use-cases/list-parent-threads.use-case';
import { ListParentThreadMessagesUseCase } from './core/use-cases/list-parent-thread-messages.use-case';
import { ListSchoolThreadsUseCase } from './core/use-cases/list-school-threads.use-case';
import { ListSchoolThreadMessagesUseCase } from './core/use-cases/list-school-thread-messages.use-case';
import { CreateSchoolMessageUseCase } from './core/use-cases/create-school-message.use-case';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [MessagesController],
  providers: [
    CreateParentMessageUseCase,
    ListParentThreadsUseCase,
    ListParentThreadMessagesUseCase,
    ListSchoolThreadsUseCase,
    ListSchoolThreadMessagesUseCase,
    CreateSchoolMessageUseCase,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: DrizzleMessageRepository,
    },
  ],
})
export class MessagesModule {}
