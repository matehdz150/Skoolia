import { Query, Resolver, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { SchoolModel } from './types/school.model';
import { SchoolsFeedInput } from './inputs/schools-feed.input';
import { PaginationInput } from './inputs/pagination.input';

import { ListSchoolsFeedUseCase } from 'src/schools/core/use-cases/list-schools.use-case';
import { SchoolsConnectionModel } from './types/schools-connection.model';

@Resolver(() => SchoolModel)
export class SchoolsFeedResolver {
  constructor(
    @Inject(ListSchoolsFeedUseCase)
    private readonly listSchoolsFeed: ListSchoolsFeedUseCase,
  ) {}

  @Query(() => SchoolsConnectionModel)
  async schoolsFeed(
    @Args('filters', { nullable: true }) filters?: SchoolsFeedInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.listSchoolsFeed.execute({
      filters: filters ?? {},
      pagination,
    });
  }
}
