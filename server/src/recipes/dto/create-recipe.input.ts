import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateIngredientInput } from '../../ingredients/dto/create-ingredient.input';

@InputType()
export class CreateRecipeInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  instructions: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => [CreateIngredientInput])
  ingredients: CreateIngredientInput[];
}