// application/dto/update-school-image.dto.ts

import { IsUUID } from 'class-validator';

export class UpdateSchoolImageDto {
  @IsUUID()
  fileId!: string;
}
