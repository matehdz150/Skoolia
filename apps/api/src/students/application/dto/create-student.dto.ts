import {
  IsInt,
  IsString,
  IsArray,
  IsUUID,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  age!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  monthlyBudget?: number;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  categoryIds?: string[];
}
