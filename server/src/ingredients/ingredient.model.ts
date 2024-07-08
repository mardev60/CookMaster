import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Recipe } from '../recipes/recipe.model';

@ObjectType()
export class Ingredient {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  quantity: string;

  @Field()
  unit: string;

  @Field(() => Recipe)
  recipe: Recipe;
}