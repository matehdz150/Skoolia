import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { Roles } from 'src/auth/application/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { CreateMessageDto } from './dto/create-message.dto';

import { CreateParentMessageUseCase } from '../core/use-cases/create-parent-message.use-case';
import { ListParentThreadsUseCase } from '../core/use-cases/list-parent-threads.use-case';
import { ListParentThreadMessagesUseCase } from '../core/use-cases/list-parent-thread-messages.use-case';
import { ListSchoolThreadsUseCase } from '../core/use-cases/list-school-threads.use-case';
import { ListSchoolThreadMessagesUseCase } from '../core/use-cases/list-school-thread-messages.use-case';
import { CreateSchoolMessageUseCase } from '../core/use-cases/create-school-message.use-case';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(CreateParentMessageUseCase)
    private readonly createParentMessage: CreateParentMessageUseCase,

    @Inject(ListParentThreadsUseCase)
    private readonly listParentThreads: ListParentThreadsUseCase,

    @Inject(ListParentThreadMessagesUseCase)
    private readonly listParentThreadMessages: ListParentThreadMessagesUseCase,

    @Inject(ListSchoolThreadsUseCase)
    private readonly listSchoolThreads: ListSchoolThreadsUseCase,

    @Inject(ListSchoolThreadMessagesUseCase)
    private readonly listSchoolThreadMessages: ListSchoolThreadMessagesUseCase,

    @Inject(CreateSchoolMessageUseCase)
    private readonly createSchoolMessage: CreateSchoolMessageUseCase,
  ) {}

  @Post('schools/:schoolId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('public')
  async sendParentMessage(
    @CurrentUser() user: JwtPayload,
    @Param('schoolId') schoolId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.createParentMessage.execute({
      user,
      schoolId,
      content: dto.content,
    });
  }

  @Get('parents')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('public')
  async getParentThreads(@CurrentUser() user: JwtPayload) {
    return this.listParentThreads.execute(user);
  }

  @Get('parents/:schoolId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('public')
  async getParentThread(
    @CurrentUser() user: JwtPayload,
    @Param('schoolId') schoolId: string,
  ) {
    return this.listParentThreadMessages.execute({ user, schoolId });
  }

  @Get('schools/me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async getSchoolThreads(@CurrentUser() user: JwtPayload) {
    return this.listSchoolThreads.execute(user);
  }

  @Get('schools/me/:publicUserId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async getSchoolThread(
    @CurrentUser() user: JwtPayload,
    @Param('publicUserId') publicUserId: string,
  ) {
    return this.listSchoolThreadMessages.execute({ user, publicUserId });
  }

  @Post('schools/me/:publicUserId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async sendSchoolMessage(
    @CurrentUser() user: JwtPayload,
    @Param('publicUserId') publicUserId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.createSchoolMessage.execute({
      user,
      publicUserId,
      content: dto.content,
    });
  }
}
