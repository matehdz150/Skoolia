import { IsUUID, IsOptional, IsIn, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsUUID()
  parentId: string;

  @IsUUID()
  schoolId: string;

  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsString()
  @IsIn(['ia_search', 'directory'])
  source: string;
}
