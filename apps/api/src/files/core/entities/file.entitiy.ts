// core/entities/file-object.ts

export type FileOwnerType = 'school' | 'course' | 'student' | 'user';

export interface FileObject {
  id: string;
  key: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  ownerId: string;
  ownerType: FileOwnerType;
  createdAt: Date;
}

export interface UploadInput {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
  folder?: string;
}
