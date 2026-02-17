import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfoModel {
  @Field()
  hasNextPage!: boolean;

  @Field({ nullable: true })
  endCursor?: string;
}
