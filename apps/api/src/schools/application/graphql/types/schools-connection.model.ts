import { ObjectType, Field } from '@nestjs/graphql';
import { SchoolEdgeModel } from './school-edge.model';
import { PageInfoModel } from './page-info.model';

@ObjectType()
export class SchoolsConnectionModel {
  @Field(() => [SchoolEdgeModel])
  edges!: SchoolEdgeModel[];

  @Field(() => PageInfoModel)
  pageInfo!: PageInfoModel;
}
