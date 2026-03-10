import { Inject } from '@nestjs/common';
import { and, asc, desc, eq, isNull } from 'drizzle-orm';

import { schoolMessages, schools, publicUsers } from 'drizzle/schemas';
import { DATABASE } from 'src/db/db.module';
import type { Database } from 'src/db/db.types';

import type {
  ParentThreadMessage,
  ParentThreadSummary,
  SchoolMessage,
  SchoolThreadMessage,
  SchoolThreadSummary,
  SenderRole,
} from '../../core/entities/message.types';
import type { MessageRepository } from '../../core/ports/message.repository';

export class DrizzleMessageRepository implements MessageRepository {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async schoolExists(schoolId: string): Promise<boolean> {
    const rows = await this.db
      .select({ id: schools.id })
      .from(schools)
      .where(eq(schools.id, schoolId))
      .limit(1);

    return rows.length > 0;
  }

  async findSchoolIdByOwner(ownerId: string): Promise<string | null> {
    const rows = await this.db
      .select({ id: schools.id })
      .from(schools)
      .where(eq(schools.ownerId, ownerId))
      .limit(1);

    return rows[0]?.id ?? null;
  }

  async createMessage(params: {
    schoolId: string;
    publicUserId: string;
    senderRole: SenderRole;
    content: string;
  }): Promise<SchoolMessage> {
    const [inserted] = await this.db
      .insert(schoolMessages)
      .values({
        schoolId: params.schoolId,
        publicUserId: params.publicUserId,
        senderRole: params.senderRole,
        content: params.content,
      })
      .returning();

    return inserted;
  }

  async listParentThreads(
    publicUserId: string,
  ): Promise<ParentThreadSummary[]> {
    const rows = await this.db
      .select({
        schoolId: schoolMessages.schoolId,
        schoolName: schools.name,
        content: schoolMessages.content,
        createdAt: schoolMessages.createdAt,
        senderRole: schoolMessages.senderRole,
      })
      .from(schoolMessages)
      .innerJoin(schools, eq(schools.id, schoolMessages.schoolId))
      .where(eq(schoolMessages.publicUserId, publicUserId))
      .orderBy(desc(schoolMessages.createdAt));

    const seen = new Set<string>();
    const threads: ParentThreadSummary[] = [];

    for (const row of rows) {
      if (seen.has(row.schoolId)) continue;
      seen.add(row.schoolId);

      threads.push({
        schoolId: row.schoolId,
        schoolName: row.schoolName,
        lastMessage: row.content,
        lastMessageAt: row.createdAt,
        lastSenderRole: row.senderRole,
      });
    }

    return threads;
  }

  async listSchoolThreadsByOwner(
    ownerId: string,
  ): Promise<SchoolThreadSummary[]> {
    const rows = await this.db
      .select({
        publicUserId: schoolMessages.publicUserId,
        publicUserName: publicUsers.name,
        content: schoolMessages.content,
        createdAt: schoolMessages.createdAt,
        senderRole: schoolMessages.senderRole,
        readAt: schoolMessages.readAt,
      })
      .from(schoolMessages)
      .innerJoin(schools, eq(schools.id, schoolMessages.schoolId))
      .innerJoin(publicUsers, eq(publicUsers.id, schoolMessages.publicUserId))
      .where(eq(schools.ownerId, ownerId))
      .orderBy(desc(schoolMessages.createdAt));

    const seen = new Set<string>();
    const unreadCountByThread = new Map<string, number>();
    const threads: SchoolThreadSummary[] = [];

    for (const row of rows) {
      if (row.senderRole !== 'public' || row.readAt) continue;

      unreadCountByThread.set(
        row.publicUserId,
        (unreadCountByThread.get(row.publicUserId) ?? 0) + 1,
      );
    }

    for (const row of rows) {
      if (seen.has(row.publicUserId)) continue;
      seen.add(row.publicUserId);

      const unreadCount = unreadCountByThread.get(row.publicUserId) ?? 0;

      threads.push({
        publicUserId: row.publicUserId,
        publicUserName: row.publicUserName ?? 'Padre de familia',
        lastMessage: row.content,
        lastMessageAt: row.createdAt,
        lastSenderRole: row.senderRole,
        unreadCount,
        threadHasUnread: unreadCount > 0,
      });
    }

    return threads;
  }

  async listParentThreadMessages(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<ParentThreadMessage[]> {
    const rows = await this.db
      .select({
        id: schoolMessages.id,
        schoolId: schoolMessages.schoolId,
        schoolName: schools.name,
        senderRole: schoolMessages.senderRole,
        content: schoolMessages.content,
        createdAt: schoolMessages.createdAt,
      })
      .from(schoolMessages)
      .innerJoin(schools, eq(schools.id, schoolMessages.schoolId))
      .where(
        and(
          eq(schoolMessages.publicUserId, params.publicUserId),
          eq(schoolMessages.schoolId, params.schoolId),
        ),
      )
      .orderBy(asc(schoolMessages.createdAt));

    return rows;
  }

  async listSchoolThreadMessagesByOwner(params: {
    ownerId: string;
    publicUserId: string;
  }): Promise<SchoolThreadMessage[]> {
    const schoolId = await this.findSchoolIdByOwner(params.ownerId);
    if (!schoolId) return [];

    await this.db
      .update(schoolMessages)
      .set({ readAt: new Date() })
      .where(
        and(
          eq(schoolMessages.schoolId, schoolId),
          eq(schoolMessages.publicUserId, params.publicUserId),
          eq(schoolMessages.senderRole, 'public'),
          isNull(schoolMessages.readAt),
        ),
      );

    const rows = await this.db
      .select({
        id: schoolMessages.id,
        publicUserId: schoolMessages.publicUserId,
        publicUserName: publicUsers.name,
        senderRole: schoolMessages.senderRole,
        content: schoolMessages.content,
        createdAt: schoolMessages.createdAt,
      })
      .from(schoolMessages)
      .innerJoin(publicUsers, eq(publicUsers.id, schoolMessages.publicUserId))
      .where(
        and(
          eq(schoolMessages.schoolId, schoolId),
          eq(schoolMessages.publicUserId, params.publicUserId),
        ),
      )
      .orderBy(asc(schoolMessages.createdAt));

    return rows.map((row) => ({
      ...row,
      publicUserName: row.publicUserName ?? 'Padre de familia',
    }));
  }
}
