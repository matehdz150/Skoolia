export interface FavoritesRepository {
  add(params: { publicUserId: string; schoolId: string }): Promise<void>;

  remove(params: { publicUserId: string; schoolId: string }): Promise<void>;

  listByUser(publicUserId: string): Promise<string[]>; // devuelve schoolIds
}
