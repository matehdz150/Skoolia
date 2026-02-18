import { Module } from '@nestjs/common';

import { FILE_REPOSITORY, FILE_STORAGE } from './core/ports/tokens';
import { AuthModule } from 'src/auth/auth.module';
import { DeleteFileUseCase } from './core/use-cases/delete-file.use-case';
import { UploadFileUseCase } from './core/use-cases/upload-file.use-case';
import { DrizzleFileRepository } from './infrastructure/adapters/drizzle-file.repository';
import { FilesController } from './application/files.controller';
import { CloudinaryFileStorageAdapter } from './infrastructure/adapters/cloudinary-file-storage.adapter';

@Module({
  imports: [AuthModule], // 🔥 SOLO IMPORTAS
  controllers: [FilesController],
  providers: [
    DeleteFileUseCase,
    UploadFileUseCase,
    {
      provide: FILE_REPOSITORY,
      useClass: DrizzleFileRepository,
    },
    {
      provide: FILE_STORAGE,
      useClass: CloudinaryFileStorageAdapter,
    },
  ],
  exports: [DeleteFileUseCase],
})
export class FilesModule {}
