import { Student, StudentWithInterests } from '../entities/student';

export interface StudentRepository {
  findByPublicUserId(
    publicUserId: string,
  ): Promise<StudentWithInterests | null>;

  create(data: {
    publicUserId: string;
    name: string;
    age: number;
    monthlyBudget?: number;
    categoryIds?: string[];
  }): Promise<Student>;

  update(
    studentId: string,
    data: {
      name?: string;
      age?: number;
      monthlyBudget?: number;
      categoryIds?: string[];
    },
  ): Promise<Student>;

  delete(studentId: string): Promise<void>;
}
