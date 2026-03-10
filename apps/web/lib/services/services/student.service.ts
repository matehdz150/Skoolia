import { api } from "../api";

/* ============================
   TYPES
============================ */

export interface Student {
  id: string;
  publicUserId: string;
  name: string;
  age: number;
  monthlyBudget: number | null;
  interests?: {
    id: string;
    name: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentPayload {
  name: string;
  age: number;
  monthlyBudget?: number;
  categoryIds: string[];
}

export interface UpdateStudentPayload {
  name?: string;
  age?: number;
  monthlyBudget?: number;
  categoryIds?: string[];
}

/* ============================
   SERVICE
============================ */

export const studentService = {
  /**
   * 👤 Obtener mi student
   * GET /students/me
   */
  async getMyStudent(): Promise<Student | null> {
    return api<Student | null>('/students/me');
  },

  /**
   * ➕ Crear student
   * POST /students
   */
  async create(payload: CreateStudentPayload): Promise<Student> {
    return api<Student>('/students', {
      method: 'POST',
      body: payload,
    });
  },

  /**
   * ✏️ Actualizar student
   * PATCH /students
   */
  async update(payload: UpdateStudentPayload): Promise<Student> {
    return api<Student>('/students', {
      method: 'PATCH',
      body: payload,
    });
  },

  /**
   * ❌ Eliminar student (opcional si lo implementas)
   * DELETE /students
   */
  async delete(): Promise<void> {
    return api<void>('/students', {
      method: 'DELETE',
    });
  },
};