import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Ingredient } from '../ingredients/ingredient.model';
import { User } from '../users/user.model';

@ObjectType()
export class Recipe {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  instructions: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => User)
  author: User;

  @Field(() => [Ingredient], { nullable: true })
  ingredients?: Ingredient[];
}