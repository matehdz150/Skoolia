export interface Student {
  id: string;
  publicUserId: string;

  name: string;
  age: number;
  monthlyBudget: number | null;

  createdAt: Date;
  updatedAt: Date;
}
