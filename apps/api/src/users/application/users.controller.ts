import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Inject,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { GetMyProfileUseCase } from '../core/use-cases/get-my-profile.use-case';
import { UpdateMyProfileUseCase } from '../core/use-cases/update-profile.use-case';

import { UpdateProfileDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(GetMyProfileUseCase)
    private readonly getMyProfile: GetMyProfileUseCase,

    @Inject(UpdateMyProfileUseCase)
    private readonly updateProfile: UpdateMyProfileUseCase,
  ) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.getMyProfile.execute(user.sub);
  }

  @Patch('me')
  async updateMe(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.updateProfile.execute(user.sub, dto);
  }
}
