// src/services/courses.service.ts
import { api } from "../api";

export interface Course {
  id: string;
  name: string;
  description?: string | null;
  coverImageUrl?: string | null;
  price: number;
  capacity?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  modality?: string | null;
  status: 'draft' | 'published' | 'archived';
  isActive: boolean;
}

export const coursesService = {
  async create(data: {
    name: string;
    description?: string;
    coverImageUrl?: string;
    price: number;
    capacity?: number;
    startDate?: string;
    endDate?: string;
    modality?: string;
  }) {
    return api<Course>('/courses', {
      method: 'POST',
      body: data,
    });
  },

  async update(courseId: string, data: Partial<Course>) {
    return api<Course>(`/courses/${courseId}`, {
      method: 'PATCH',
      body: data,
    });
  },

  async delete(courseId: string) {
    return api<void>(`/courses/${courseId}`, {
      method: 'DELETE',
    });
  },
};