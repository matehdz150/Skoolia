import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  modality?: string;
}
