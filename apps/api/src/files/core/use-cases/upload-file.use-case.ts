// application/use-cases/upload-file.use-case.ts

import { Inject } from '@nestjs/common';
import * as fileStorageRepository from '../ports/file-storage.repository';
import * as fileRepository from '../ports/file.repository';
import { FileOwnerType } from '../entities/file.entitiy';

export class UploadFileUseCase {
  constructor(
    @Inject('FILE_STORAGE')
    private readonly storage: fileStorageRepository.FileStorage,

    @Inject('FILE_REPOSITORY')
    private readonly repository: fileRepository.FileRepository,
  ) {}

  async execute(params: {
    ownerId: string;
    ownerType: FileOwnerType;
    fileName: string;
    mimeType: string;
    buffer: Buffer;
    folder?: string;
  }) {
    // 1️⃣ subir al storage
    const uploaded = await this.storage.upload({
      fileName: params.fileName,
      mimeType: params.mimeType,
      buffer: params.buffer,
      folder: params.folder,
    });

    // 2️⃣ guardar metadata en DB
    return this.repository.save({
      key: uploaded.key,
      url: uploaded.url,
      sizeBytes: uploaded.sizeBytes,
      mimeType: params.mimeType,
      ownerId: params.ownerId,
      ownerType: params.ownerType,
    });
  }
}
