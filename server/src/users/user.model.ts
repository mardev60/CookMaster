import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Recipe } from '../recipes/recipe.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Recipe], { nullable: true })
  recipes?: Recipe[];
}