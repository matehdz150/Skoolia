// application/dto/update-course-image.dto.ts
import { IsUUID } from 'class-validator';

export class UpdateCourseImageDto {
  @IsUUID()
  fileId!: string;
}
