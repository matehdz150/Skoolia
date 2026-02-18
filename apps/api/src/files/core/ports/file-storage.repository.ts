// core/ports/file-storage.port.ts

import { FileObject, UploadInput } from '../entities/file.entitiy';

export interface FileStorage {
  upload(input: UploadInput): Promise<FileObject>;

  delete(key: string): Promise<void>;
}
