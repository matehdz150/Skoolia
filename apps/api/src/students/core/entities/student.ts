export interface Student {
  id: string;
  publicUserId: string;

  name: string;
  age: number;
  monthlyBudget: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface StudentWithInterests extends Student {
  interests: {
    id: string;
    name: string;
    slug: string;
  }[];
}
