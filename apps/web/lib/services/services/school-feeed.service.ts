// src/services/schools-feed.service.ts
import { graphql } from "../graphQl";

export interface SchoolNode {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  address?: string | null;
  city?: string | null;
  averageRating: number;
  favoritesCount: number;
  isVerified: boolean;
}

export interface SchoolEdge {
  node: SchoolNode;
  cursor: string;
}

export interface SchoolsConnection {
  edges: SchoolEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export interface SchoolsFeedFilters {
  city?: string;
  categoryId?: string;
  search?: string;
  sortBy?: 'favorites' | 'rating' | 'recent';
  onlyVerified?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface PaginationInput {
  first: number;
  after?: string;
}

export const schoolsFeedService = {
  async list(params: {
    filters?: SchoolsFeedFilters;
    pagination: PaginationInput;
  }): Promise<SchoolsConnection> {
    const query = `
      query SchoolsFeed($filters: SchoolsFeedInput, $pagination: PaginationInput) {
        schoolsFeed(filters: $filters, pagination: $pagination) {
          edges {
            node {
              id
              name
              description
              logoUrl
              coverImageUrl
              address
              city
              averageRating
              favoritesCount
              isVerified
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const data = await graphql<{
      schoolsFeed: SchoolsConnection;
    }>(query, {
      filters: params.filters,
      pagination: params.pagination,
    });

    return data.schoolsFeed;
  },
};