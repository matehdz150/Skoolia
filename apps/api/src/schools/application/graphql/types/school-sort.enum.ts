// src/schools/graphql/enums/school-sort.enum.ts

import { registerEnumType } from '@nestjs/graphql';

export enum SchoolSortEnum {
  FAVORITES = 'favorites',
  RATING = 'rating',
  RECENT = 'recent',
}

registerEnumType(SchoolSortEnum, {
  name: 'SchoolSortEnum',
});
