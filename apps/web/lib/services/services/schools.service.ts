// src/services/schools.service.ts
import { api } from "../api";

export interface School {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  address?: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  averageRating: number;
  favoritesCount: number;
  isVerified: boolean;
}

export const schoolsService = {
  async create(data: {
    name: string;
    description?: string;
  }) {
    return api<School>('/schools', {
      method: 'POST',
      body: data,
    });
  },

  async getMySchool() {
    return api<School>('/schools/me');
  },

  async update(data: {
    name?: string;
    description?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    address?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  }) {
    return api<School>('/schools', {
      method: 'PATCH',
      body: data,
    });
  },
};