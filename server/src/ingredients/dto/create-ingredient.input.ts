import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIngredientInput {
  @Field()
  name: string;

  @Field()
  quantity: string;

  @Field()
  unit: string;
}