import { IsUUID } from 'class-validator';

export class UpdateUserAvatarDto {
  @IsUUID()
  fileId!: string;
}
