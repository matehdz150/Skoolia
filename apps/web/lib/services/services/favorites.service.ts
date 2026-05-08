// src/services/favorites.service.ts
import { api } from "../api";

export type FavoriteListItem = {
  id: string;
  type?: "SCHOOL" | "COURSE";
  name: string;
  coverImageUrl: string | null;
  city: string | null;
  monthlyPrice?: number | null;
  price?: number | null;
  description?: string | null;
  averageRating?: number | null;
  schedule?: string | null;
  languages?: string | null;
  maxStudentsPerClass?: number | null;
  enrollmentOpen?: boolean | null;
  enrollmentYear?: number | null;
  startDate?: string | null;
  capacity?: number | null;
};

export const favoritesService = {
  async toggle(schoolId: string) {
    return api<{ isFavorite: boolean }>(
      `/favorites/${schoolId}`,
      { method: 'POST' }
    );
  },
  async listForMe() {
    return api<FavoriteListItem[]>('/favorites');
  },
  async isFavorite(schoolId: string) {
    return api<{ isFavorite: boolean }>(`/favorites/${schoolId}/check`);
  },
};
