import { Inject } from '@nestjs/common';
import * as fileStorageRepository from '../ports/file-storage.repository';
import * as fileRepository from '../ports/file.repository';

export class DeleteFileUseCase {
  constructor(
    @Inject('FILE_STORAGE')
    private readonly storage: fileStorageRepository.FileStorage,

    @Inject('FILE_REPOSITORY')
    private readonly repository: fileRepository.FileRepository,
  ) {}

  async execute(fileId: string) {
    const file = await this.repository.findById(fileId);

    if (!file) {
      throw new Error('File not found');
    }

    await this.storage.delete(file.key);

    await this.repository.delete(fileId);
  }
}
