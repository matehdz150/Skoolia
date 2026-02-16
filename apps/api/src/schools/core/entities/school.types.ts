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
  isVerified: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
