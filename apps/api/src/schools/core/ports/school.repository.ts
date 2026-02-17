import { SchoolsConnection } from 'src/schools/core/entities/schools-connection';
import type { School } from '../entities/school.types';

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

  assignCategories(schoolId: string, categoryIds: string[]): Promise<void>;

  findByOwner(ownerId: string): Promise<School | null>;

  listForFeed(params: {
    filters?: {
      city?: string;
      categoryId?: string;
      search?: string;
      sortBy?: 'favorites' | 'rating' | 'recent';
      onlyVerified?: boolean;
    };
    pagination?: {
      first: number;
      after?: string;
    };
  }): Promise<SchoolsConnection>;
}
