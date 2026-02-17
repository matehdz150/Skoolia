// src/services/schools.categories.service.ts
import { api } from "../api";

export const schoolCategoriesService = {
  async assign(categoryIds: string[]) {
    return api<{ success: boolean }>('/schools/categories', {
      method: 'POST',
      body: { categoryIds },
    });
  },
};