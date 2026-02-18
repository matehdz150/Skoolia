// core/entities/user.ts

export type UserRole = 'public' | 'private';

export interface User {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  role: UserRole;
  createdAt: Date;
}
