import {
  ParentThreadMessage,
  ParentThreadSummary,
  SchoolMessage,
  SchoolThreadMessage,
  SchoolThreadSummary,
  SenderRole,
} from '../entities/message.types';

export interface MessageRepository {
  schoolExists(schoolId: string): Promise<boolean>;

  findSchoolIdByOwner(ownerId: string): Promise<string | null>;

  createMessage(params: {
    schoolId: string;
    publicUserId: string;
    senderRole: SenderRole;
    content: string;
  }): Promise<SchoolMessage>;

  listParentThreads(publicUserId: string): Promise<ParentThreadSummary[]>;

  listSchoolThreadsByOwner(ownerId: string): Promise<SchoolThreadSummary[]>;

  listParentThreadMessages(params: {
    publicUserId: string;
    schoolId: string;
  }): Promise<ParentThreadMessage[]>;

  listSchoolThreadMessagesByOwner(params: {
    ownerId: string;
    publicUserId: string;
  }): Promise<SchoolThreadMessage[]>;
}
