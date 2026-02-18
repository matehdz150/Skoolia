// core/ports/file-storage.port.ts

import { UploadInput } from '../entities/file.entitiy';

export interface FileStorage {
  upload(input: UploadInput): Promise<{
    key: string;
    url: string;
    sizeBytes: number;
  }>;

  delete(key: string): Promise<void>;
}
