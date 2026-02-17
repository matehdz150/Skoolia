import { SchoolModel } from './school.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SchoolEdgeModel {
  @Field(() => SchoolModel)
  node!: SchoolModel;

  @Field()
  cursor!: string;
}
