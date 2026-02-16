import { Student } from '../entities/student';

export interface StudentRepository {
  findByPublicUserId(publicUserId: string): Promise<Student | null>;

  create(data: {
    publicUserId: string;
    name: string;
    age: number;
    monthlyBudget?: number;
    categoryIds: string[];
  }): Promise<Student>;
}
