import { School } from './school.types';

export interface SchoolEdge {
  node: School;
  cursor: string;
}

export interface SchoolsConnection {
  edges: SchoolEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}
