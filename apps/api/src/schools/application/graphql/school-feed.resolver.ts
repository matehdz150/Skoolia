import { Query, Resolver, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { SchoolModel } from './types/school.model';
import { SchoolsFeedInput } from './inputs/schools-feed.input';
import { ListSchoolsFeedUseCase } from 'src/schools/core/use-cases/list-schools.use-case';

@Resolver(() => SchoolModel)
export class SchoolsFeedResolver {
  constructor(
    @Inject(ListSchoolsFeedUseCase)
    private readonly listSchoolsFeed: ListSchoolsFeedUseCase,
  ) {}

  @Query(() => [SchoolModel])
  async schoolsFeed(
    @Args('filters', { nullable: true }) filters?: SchoolsFeedInput,
  ) {
    return this.listSchoolsFeed.execute(filters ?? {});
  }
}
