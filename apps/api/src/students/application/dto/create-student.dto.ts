import { IsInt, IsString, IsArray, IsUUID, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  age!: number;

  @IsInt()
  @Min(0)
  monthlyBudget?: number;

  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds!: string[];
}
