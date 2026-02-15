// src/lib/graphql.ts
import { api } from './api';

interface GraphQLResponse<T> {
  data?: T;
  errors?: {
    message: string;
  }[];
}

export async function graphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await api<GraphQLResponse<T>>('/graphql', {
    method: 'POST',
    body: {
      query,
      variables,
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error('No data returned from GraphQL');
  }

  return res.data;
}