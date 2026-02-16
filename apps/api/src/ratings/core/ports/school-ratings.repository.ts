import type { SchoolRating } from '../entities/school-rating.types';

export interface SchoolRatingsRepository {
  // read helpers
  findSchoolById(schoolId: string): Promise<{ id: string } | null>;
  findByUserAndSchool(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<SchoolRating | null>;

  // write
  upsert(params: {
    publicUserId: string;
    schoolId: string;
    rating: number;
    comment?: string;
  }): Promise<SchoolRating>;

  remove(params: { publicUserId: string; schoolId: string }): Promise<void>;

  // list
  listBySchool(params: {
    schoolId: string;
    limit: number;
    offset: number;
  }): Promise<SchoolRating[]>;

  // aggregates
  recalcSchoolRatingStats(schoolId: string): Promise<void>;
}
