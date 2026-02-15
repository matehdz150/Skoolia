import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { Roles } from 'src/auth/application/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

import { CreateSchoolUseCase } from '../core/use-cases/create-school.use-case';
import { GetMySchoolUseCase } from '../core/use-cases/get-my-school.use-case';
import { UpdateSchoolUseCase } from '../core/use-cases/update-school.use-case';

@Controller('schools')
export class SchoolsController {
  constructor(
    @Inject(CreateSchoolUseCase)
    private readonly createSchool: CreateSchoolUseCase,

    @Inject(GetMySchoolUseCase)
    private readonly getMySchool: GetMySchoolUseCase,

    @Inject(UpdateSchoolUseCase)
    private readonly updateSchool: UpdateSchoolUseCase,
  ) {}

  /**
   * 🔒 Solo usuarios PRIVATE pueden crear escuela
   */
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async create(@Body() dto: CreateSchoolDto, @CurrentUser() user: JwtPayload) {
    return this.createSchool.execute({
      ownerId: user.sub,
      role: user.role,
      name: dto.name,
      description: dto.description,
    });
  }

  /**
   * 🔒 Devuelve la escuela del owner logueado
   */
  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async mySchool(@CurrentUser() user: JwtPayload) {
    return this.getMySchool.execute({
      ownerId: user.sub,
      role: user.role,
    });
  }

  /**
   * 🔒 Actualizar escuela del owner
   */
  @Patch()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async update(@Body() dto: UpdateSchoolDto, @CurrentUser() user: JwtPayload) {
    return this.updateSchool.execute({
      ownerId: user.sub,
      role: user.role,
      data: dto,
    });
  }
}
