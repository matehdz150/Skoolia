import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsString()
  modality?: string;

  @IsOptional()
  status?: 'draft' | 'published' | 'archived';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
