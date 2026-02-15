import type { School } from '../types/school.types';

export interface SchoolRepository {
  create(params: {
    name: string;
    description?: string;
    ownerId: string;
  }): Promise<School>;

  findByOwner(ownerId: string): Promise<School | null>;

  findById(id: string): Promise<School | null>;

  update(params: {
    schoolId: string;
    ownerId: string;
    name?: string;
    description?: string;
  }): Promise<School>;

  list(): Promise<School[]>;
}
