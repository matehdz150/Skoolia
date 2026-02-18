// src/services/schools.service.ts
import { api } from "../api";

export interface School {
  id: string;

  name: string;
  description: string | null;

  // 🖼 imágenes
  logoUrl: string | null;
  coverImageUrl: string | null;

  // 📍 ubicación
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;

  // 🎓 info académica
  educationalLevel: string | null;
  institutionType: string | null;
  schedule: string | null;
  languages: string | null;
  maxStudentsPerClass: number | null;
  enrollmentYear: number | null;
  enrollmentOpen: boolean;

  // 💰 precios
  monthlyPrice: number | null;

  // ⭐ métricas
  averageRating: number;
  ratingsCount: number;
  favoritesCount: number;
  rankingScore: number;

  // 🏅 flags
  isFeatured: boolean;
  isVerified: boolean;

  ownerId: string;

  createdAt: string;
  updatedAt: string;
}

export const schoolsService = {
  async create(data: {
    name: string;
    description?: string;
  }) {
    return api<School>("/schools", {
      method: "POST",
      body: data,
    });
  },

  async getMySchool() {
    return api<School>("/schools/me");
  },

  async getById(id: string) {
    return api<School>(`/schools/${id}`);
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

    educationalLevel?: string;
    institutionType?: string;
    schedule?: string;
    languages?: string;
    maxStudentsPerClass?: number;
    enrollmentYear?: number;
    enrollmentOpen?: boolean;
    monthlyPrice?: number;
  }) {
    return api<School>("/schools", {
      method: "PATCH",
      body: data,
    });
  },
};