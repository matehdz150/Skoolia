/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Inject,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { CurrentUser } from 'src/auth/application/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/core/types/jwt-payload';

import { UploadFileUseCase } from '../core/use-cases/upload-file.use-case';
import { DeleteFileUseCase } from '../core/use-cases/delete-file.use-case';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(
    @Inject(UploadFileUseCase)
    private readonly uploadFile: UploadFileUseCase,

    @Inject(DeleteFileUseCase)
    private readonly deleteFile: DeleteFileUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: JwtPayload,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.uploadFile.execute({
      fileName: file.originalname,
      mimeType: file.mimetype,
      buffer: file.buffer,
      ownerId: user.sub,
      ownerType: this.mapRoleToOwnerType(user.role),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteFile.execute(id);
    return { success: true };
  }

  private mapRoleToOwnerType(role: 'public' | 'private') {
    return role === 'private' ? 'school' : 'user';
  }
}
