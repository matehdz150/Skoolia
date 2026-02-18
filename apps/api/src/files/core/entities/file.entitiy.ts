// core/entities/file-object.ts

export interface FileObject {
  id: string;
  key: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  folder: string | null;
  createdAt: Date;
}

export interface UploadInput {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
  folder?: string;
}
