// src/services/auth.service.ts

import { api } from "../api";

export type UserRole = 'public' | 'private';

export interface RegisterInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthMessageResponse {
  message?: string;
  success?: boolean;
}

export const authService = {
  async register(data: RegisterInput) {
    return api<AuthMessageResponse>('/auth/register', {
      method: 'POST',
      body: data,
    });
  },

  async login(data: LoginInput) {
    return api<AuthMessageResponse>('/auth/login', {
      method: 'POST',
      body: data,
    });
  },

  async logout() {
    return api<AuthMessageResponse>('/auth/logout', {
      method: 'POST',
    });
  },

  async refresh() {
    return api<AuthMessageResponse>('/auth/refresh', {
      method: 'POST',
    });
  },
};
