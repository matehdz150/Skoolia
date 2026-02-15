export interface FavoritesRepository {
  add(params: { publicUserId: string; schoolId: string }): Promise<void>;

  remove(params: { publicUserId: string; schoolId: string }): Promise<void>;

  existsByUserAndSchool(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<boolean>;
}
