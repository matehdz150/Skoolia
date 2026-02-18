import { Inject, Injectable } from '@nestjs/common';
import { privateUsers, publicUsers } from 'drizzle/schemas';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';
import { User } from 'src/users/core/entitites/user.entity';
import { UserRepository } from 'src/users/core/ports/users.repository';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async findById(id: string): Promise<User | null> {
    const publicUser = await this.db
      .select()
      .from(publicUsers)
      .where(eq(publicUsers.id, id))
      .limit(1);

    if (publicUser[0]) {
      return {
        ...publicUser[0],
        role: 'public',
      };
    }

    const privateUser = await this.db
      .select()
      .from(privateUsers)
      .where(eq(privateUsers.id, id))
      .limit(1);

    if (privateUser[0]) {
      const row = privateUser[0];

      return {
        id: row.id,
        name: row.name,
        email: row.email,
        avatarUrl: null, // 🔥 private no tiene avatar
        role: 'private',
        createdAt: row.createdAt,
      };
    }

    return null;
  }

  async update(
    id: string,
    data: { name?: string; avatarUrl?: string },
  ): Promise<User> {
    // 1️⃣ intentar actualizar public
    const [updatedPublic] = await this.db
      .update(publicUsers)
      .set(data)
      .where(eq(publicUsers.id, id))
      .returning();

    if (updatedPublic) {
      return {
        id: updatedPublic.id,
        name: updatedPublic.name,
        email: updatedPublic.email,
        avatarUrl: updatedPublic.avatarUrl ?? null,
        role: 'public', // 🔥 literal correcto
        createdAt: updatedPublic.createdAt,
      };
    }

    // 2️⃣ intentar private
    const [updatedPrivate] = await this.db
      .update(privateUsers)
      .set(data)
      .where(eq(privateUsers.id, id))
      .returning();

    if (updatedPrivate) {
      return {
        id: updatedPrivate.id,
        name: updatedPrivate.name,
        email: updatedPrivate.email,
        avatarUrl: null, // 🔥 private no tiene avatar
        role: 'private', // 🔥 literal correcto
        createdAt: updatedPrivate.createdAt,
      };
    }

    throw new Error('User not found');
  }
}
