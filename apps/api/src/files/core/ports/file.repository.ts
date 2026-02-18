// core/ports/file.repository.ts

import { FileObject, FileOwnerType } from '../entities/file.entitiy';

export interface FileRepository {
  save(data: {
    key: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
    ownerId: string;
    ownerType: FileOwnerType;
  }): Promise<FileObject>;

  findById(id: string): Promise<FileObject | null>;

  delete(id: string): Promise<void>;
}
