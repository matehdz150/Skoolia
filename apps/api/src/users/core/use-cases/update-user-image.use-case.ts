import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../ports/tokens';
import type { UserRepository } from '../ports/users.repository';
import { DeleteFileUseCase } from 'src/files/core/use-cases/delete-file.use-case';

export class UpdateUserAvatarUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,

    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(params: {
    userId: string;
    role: 'public' | 'private';
    fileId: string;
  }) {
    const raw = await this.repository.findRawById(params.userId);

    if (!raw) {
      throw new NotFoundException('User not found');
    }

    const { oldFileId } = await this.repository.updateAvatarAtomic({
      userId: params.userId,
      newFileId: params.fileId,
    });

    if (oldFileId && oldFileId !== params.fileId) {
      await this.deleteFileUseCase.execute(oldFileId);
    }

    return this.repository.findById(params.userId);
  }
}
