import type { School } from '../entities/school.types';

export interface FavoritesRepository {
  add(params: { publicUserId: string; schoolId: string }): Promise<void>;

  remove(params: { publicUserId: string; schoolId: string }): Promise<void>;

  existsByUserAndSchool(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<boolean>;

  /**
   * Lista todas las escuelas marcadas como favoritas por un usuario público.
   */
  listForUser(publicUserId: string): Promise<School[]>;
}
