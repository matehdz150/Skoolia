import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { CreateStudentDto } from './dto/create-student.dto';
import { CreateStudentUseCase } from '../core/use-cases/create-student.use-case';
import { GetMyStudentUseCase } from '../core/use-cases/get-my-student.use-case';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(CreateStudentUseCase)
    private readonly createStudent: CreateStudentUseCase,

    @Inject(GetMyStudentUseCase)
    private readonly getMyStudent: GetMyStudentUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateStudentDto, @CurrentUser() user: JwtPayload) {
    return this.createStudent.execute(user, dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async myStudent(@CurrentUser() user: JwtPayload) {
    return this.getMyStudent.execute(user);
  }
}
