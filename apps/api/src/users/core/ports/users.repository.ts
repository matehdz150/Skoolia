// core/ports/user.repository.ts

import { User } from '../entitites/user.entity';

export interface UserRepository {
  findById(id: string): Promise<User | null>;

  update(
    id: string,
    data: {
      name?: string;
      avatarUrl?: string;
    },
  ): Promise<User>;

  findRawById(userId: string): Promise<{
    id: string;
    avatarFileId: string | null;
  } | null>;

  updateAvatarAtomic(params: { userId: string; newFileId: string }): Promise<{
    oldFileId: string | null;
  }>;
}
