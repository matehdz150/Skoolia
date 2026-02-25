// src/services/schools.categories.service.ts
import { api } from "../api";

export interface Category{
  id: string;
  name: string;
  slug: string;
}

export const schoolCategoriesService = {
  async assign(categoryIds: string[]) {
    return api<{ success: boolean }>('/schools/categories', {
      method: 'POST',
      body: { categoryIds },
    });
  },
  async getAllCategories() {
    return api<Category[]>("/categories");
  },
};