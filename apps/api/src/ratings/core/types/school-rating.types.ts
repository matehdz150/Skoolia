export type SchoolRating = {
  id: string;
  schoolId: string;
  publicUserId: string;
  rating: number; // 1-5
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};
