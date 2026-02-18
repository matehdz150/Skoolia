// application/dto/upload-file.dto.ts

import { IsString } from 'class-validator';
import type { FileOwnerType } from '../../core/entities/file.entitiy';

export class UploadFileDto {
  @IsString()
  ownerId!: string;

  @IsString()
  ownerType!: FileOwnerType;
}
