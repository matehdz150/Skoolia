// src/services/favorites.service.ts
import { api } from "../api";

export const favoritesService = {
  async toggle(schoolId: string) {
    return api<{ isFavorite: boolean }>(
      `/schools/${schoolId}/favorite`,
      { method: 'POST' }
    );
  },
};