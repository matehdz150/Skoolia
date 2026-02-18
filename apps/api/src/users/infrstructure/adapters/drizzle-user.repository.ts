import { Inject, Injectable } from '@nestjs/common';
import { files, privateUsers, publicUsers } from 'drizzle/schemas';
import { DATABASE } from 'src/db/db.module';
import * as dbTypes from 'src/db/db.types';
import { User } from 'src/users/core/entitites/user.entity';
import { UserRepository } from 'src/users/core/ports/users.repository';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@Inject(DATABASE) private readonly db: dbTypes.Database) {}

  async findById(id: string): Promise<User | null> {
    const avatarFile = alias(files, 'avatar_file');

    // 🔹 PUBLIC USER
    const publicRows = await this.db
      .select({
        id: publicUsers.id,
        name: publicUsers.name,
        email: publicUsers.email,
        avatarUrl: avatarFile.url, // 👈 URL real
        createdAt: publicUsers.createdAt,
      })
      .from(publicUsers)
      .leftJoin(avatarFile, eq(avatarFile.id, publicUsers.avatarUrl))
      .where(eq(publicUsers.id, id))
      .limit(1);

    if (publicRows[0]) {
      return {
        ...publicRows[0],
        role: 'public',
      };
    }

    // 🔹 PRIVATE USER (no avatar)
    const privateRows = await this.db
      .select({
        id: privateUsers.id,
        name: privateUsers.name,
        email: privateUsers.email,
        createdAt: privateUsers.createdAt,
      })
      .from(privateUsers)
      .where(eq(privateUsers.id, id))
      .limit(1);

    if (privateRows[0]) {
      return {
        ...privateRows[0],
        avatarUrl: null,
        role: 'private',
      };
    }

    return null;
  }

  async update(id: string, data: { name?: string }): Promise<User> {
    // 1️⃣ intentar actualizar public
    const [updatedPublic] = await this.db
      .update(publicUsers)
      .set({
        name: data.name,
      })
      .where(eq(publicUsers.id, id))
      .returning();

    if (updatedPublic) {
      return {
        id: updatedPublic.id,
        name: updatedPublic.name,
        email: updatedPublic.email,
        avatarUrl: updatedPublic.avatarUrl ?? null,
        role: 'public',
        createdAt: updatedPublic.createdAt,
      };
    }

    // 2️⃣ intentar private
    const [updatedPrivate] = await this.db
      .update(privateUsers)
      .set({
        name: data.name,
      })
      .where(eq(privateUsers.id, id))
      .returning();

    if (updatedPrivate) {
      return {
        id: updatedPrivate.id,
        name: updatedPrivate.name,
        email: updatedPrivate.email,
        avatarUrl: null,
        role: 'private',
        createdAt: updatedPrivate.createdAt,
      };
    }

    throw new Error('User not found');
  }

  async findRawById(userId: string) {
    const rows = await this.db
      .select({
        id: publicUsers.id,
        avatarFileId: publicUsers.avatarUrl,
      })
      .from(publicUsers)
      .where(eq(publicUsers.id, userId))
      .limit(1);

    return rows[0] ?? null;
  }

  async updateAvatarAtomic(params: {
    userId: string;
    newFileId: string;
  }): Promise<{ oldFileId: string | null }> {
    return this.db.transaction(async (tx) => {
      const row = await tx
        .select({
          avatarUrl: publicUsers.avatarUrl,
        })
        .from(publicUsers)
        .where(eq(publicUsers.id, params.userId))
        .limit(1);

      if (!row[0]) {
        throw new Error('User not found');
      }

      const oldFileId = row[0].avatarUrl;

      await tx
        .update(publicUsers)
        .set({
          avatarUrl: params.newFileId,
        })
        .where(eq(publicUsers.id, params.userId));

      return { oldFileId };
    });
  }
}
