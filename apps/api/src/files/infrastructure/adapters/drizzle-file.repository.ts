import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DATABASE } from 'src/db/db.module';
import type { Database } from 'src/db/db.types';

import { files } from 'drizzle/schemas';

import type { FileRepository } from '../../core/ports/file.repository';
import type {
  FileObject,
  FileOwnerType,
} from '../../core/entities/file.entitiy';

@Injectable()
export class DrizzleFileRepository implements FileRepository {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async save(data: {
    key: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
    ownerId: string;
    ownerType: FileOwnerType;
  }): Promise<FileObject> {
    const [created] = await this.db
      .insert(files)
      .values({
        key: data.key,
        url: data.url,
        mimeType: data.mimeType,
        sizeBytes: data.sizeBytes,
        ownerId: data.ownerId,
        ownerType: data.ownerType,
      })
      .returning();

    return created;
  }

  async findById(id: string): Promise<FileObject | null> {
    const rows = await this.db
      .select()
      .from(files)
      .where(eq(files.id, id))
      .limit(1);

    return rows[0] ?? null;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(files).where(eq(files.id, id));
  }
}
