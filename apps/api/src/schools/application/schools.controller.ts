import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { Roles } from 'src/auth/application/decorators/roles.decorator';

import { CreateSchoolDto } from './dto/create-school.dto';

import { CreateSchoolUseCase } from '../core/use-cases/create-school.use-case';
import { GetMySchoolUseCase } from '../core/use-cases/get-my-school.use-case';
import * as jwtPayload from 'src/auth/core/types/jwt-payload';
import * as jwtPayload_1 from 'src/auth/core/types/jwt-payload';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

@Controller('schools')
export class SchoolsController {
  constructor(
    @Inject(CreateSchoolUseCase)
    private readonly createSchool: CreateSchoolUseCase,

    @Inject(GetMySchoolUseCase)
    private readonly getMySchool: GetMySchoolUseCase,
  ) {}

  /**
   * 🔒 Solo usuarios PRIVATE pueden crear escuela
   */
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async create(
    @Body() dto: CreateSchoolDto,
    @CurrentUser() user: jwtPayload.JwtPayload,
  ) {
    return this.createSchool.execute({
      ownerId: user.sub,
      role: user.role,
      name: dto.name,
      description: dto.description,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async mySchool(@CurrentUser() user: jwtPayload_1.JwtPayload) {
    return this.getMySchool.execute({
      ownerId: user.sub,
      role: user.role,
    });
  }
}
