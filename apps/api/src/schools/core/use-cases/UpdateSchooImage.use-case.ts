import { Inject, ForbiddenException, NotFoundException } from '@nestjs/common';

import { SCHOOL_REPOSITORY } from '../ports/tokens';
import type { SchoolRepository } from '../ports/school.repository';

import { DeleteFileUseCase } from 'src/files/core/use-cases/delete-file.use-case';

export type SchoolImageField = 'logoUrl' | 'coverImageUrl';

export class UpdateSchoolImageUseCase {
  constructor(
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: SchoolRepository,

    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(params: {
    ownerId: string;
    role: 'public' | 'private';
    field: SchoolImageField;
    fileId: string;
  }) {
    if (params.role !== 'private') {
      throw new ForbiddenException();
    }

    const school = await this.schoolRepository.findRawByOwner(params.ownerId);

    if (!school) {
      throw new NotFoundException('School not found');
    }

    const { oldFileId } = await this.schoolRepository.updateImageAtomic({
      ownerId: params.ownerId,
      field: params.field,
      newFileId: params.fileId,
    });

    if (oldFileId && oldFileId !== params.fileId) {
      await this.deleteFileUseCase.execute(oldFileId);
    }

    return this.schoolRepository.findByOwner(params.ownerId);
  }
}
