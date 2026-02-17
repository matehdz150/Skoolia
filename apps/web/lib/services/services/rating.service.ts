// src/services/school-ratings.service.ts

import { api } from "../api";

/* ================================
   TYPES
================================ */

export interface SchoolRating {
  id: string;
  schoolId: string;
  publicUserId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface PaginatedRatings {
  data: SchoolRating[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/* ================================
   SERVICE
================================ */

export const schoolRatingsService = {
  /**
   * ⭐ Crear o actualizar mi rating
   * POST /schools/:schoolId/ratings
   */
  async upsert(params: {
    schoolId: string;
    rating: number;
    comment?: string;
  }): Promise<SchoolRating> {
    return api<SchoolRating>(`/schools/${params.schoolId}/ratings`, {
      method: 'POST',
      body: {
        rating: params.rating,
        comment: params.comment,
      },
    });
  },

  /**
   * 🗑️ Borrar mi rating
   * DELETE /schools/:schoolId/ratings
   */
  async remove(schoolId: string): Promise<void> {
    return api<void>(`/schools/${schoolId}/ratings`, {
      method: 'DELETE',
    });
  },

  /**
   * 📜 Listar ratings paginados
   * GET /schools/:schoolId/ratings?page=1&pageSize=10
   */
  async list(params: {
    schoolId: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedRatings> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;

    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    return api<PaginatedRatings>(
      `/schools/${params.schoolId}/ratings?${query.toString()}`,
    );
  },
};