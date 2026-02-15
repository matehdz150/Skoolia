import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { Roles } from 'src/auth/application/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { CreateCourseUseCase } from '../core/use-cases/create-course.use-case';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject(CreateCourseUseCase)
    private readonly createCourse: CreateCourseUseCase,
  ) {}

  /**
   * 🔒 Solo PRIVATE users pueden crear cursos
   * (porque están ligados a una escuela)
   */
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async create(@Body() dto: CreateCourseDto, @CurrentUser() user: JwtPayload) {
    return this.createCourse.execute({
      ownerId: user.sub,
      role: user.role,
      name: dto.name,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      price: dto.price ?? 0,
      capacity: dto.capacity,
      startDate: dto.startDate,
      endDate: dto.endDate,
      modality: dto.modality,
    });
  }
}
