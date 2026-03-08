export type SenderRole = 'public' | 'private';

export interface SchoolMessage {
  id: string;
  schoolId: string;
  publicUserId: string;
  senderRole: SenderRole;
  content: string;
  createdAt: Date;
}

export interface ParentThreadSummary {
  schoolId: string;
  schoolName: string;
  lastMessage: string;
  lastMessageAt: Date;
}

export interface SchoolThreadSummary {
  publicUserId: string;
  publicUserName: string;
  lastMessage: string;
  lastMessageAt: Date;
}

export interface ParentThreadMessage {
  id: string;
  schoolId: string;
  schoolName: string;
  senderRole: SenderRole;
  content: string;
  createdAt: Date;
}

export interface SchoolThreadMessage {
  id: string;
  publicUserId: string;
  publicUserName: string;
  senderRole: SenderRole;
  content: string;
  createdAt: Date;
}
