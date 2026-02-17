export interface School {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  favoritesCount: number;
  educationalLevel: string;
  enrollmentYear: string;
  enrollmentOpen: string;
  monthlyPrice: string;
  schedule: string;
  languages: string;
  maxStudentsPerClass: string;
  isVerified: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
