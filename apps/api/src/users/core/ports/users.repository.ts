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
}
