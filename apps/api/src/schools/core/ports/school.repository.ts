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
    ownerId: string;
    data: {
      name?: string;
      description?: string;
      logoUrl?: string;
      coverImageUrl?: string;
      address?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
    };
  }): Promise<School>;

  list(): Promise<School[]>;
}
