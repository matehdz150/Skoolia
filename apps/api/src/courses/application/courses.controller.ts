import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { RolesGuard } from 'src/auth/application/guards/roles.guard';
import { Roles } from 'src/auth/application/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';

import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { CreateCourseUseCase } from '../core/use-cases/create-course.use-case';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateCourseUseCase } from '../core/use-cases/update-course.use-case';
import { DeleteCourseUseCase } from '../core/use-cases/delete-course.use-case';
import { UpdateCourseImageDto } from './dto/update-image.dto';
import { UpdateCourseImageUseCase } from '../core/use-cases/update-image.use-case';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject(CreateCourseUseCase)
    private readonly createCourse: CreateCourseUseCase,

    @Inject(UpdateCourseUseCase)
    private readonly updateCourse: UpdateCourseUseCase,

    @Inject(DeleteCourseUseCase)
    private readonly deleteCourse: DeleteCourseUseCase,

    @Inject(UpdateCourseImageUseCase)
    private readonly updateCourseImageUseCase: UpdateCourseImageUseCase,
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

  @Patch(':id/image')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async updateImage(
    @Param('id') courseId: string,
    @Body() dto: UpdateCourseImageDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.updateCourseImageUseCase.execute({
      ownerId: user.sub,
      role: user.role,
      courseId,
      fileId: dto.fileId,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.updateCourse.execute({
      ownerId: user.sub,
      role: user.role,
      courseId: id,
      data: dto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('private')
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.deleteCourse.execute({
      ownerId: user.sub,
      role: user.role,
      courseId: id,
    });
  }
}
