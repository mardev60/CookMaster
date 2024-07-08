import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredient.model';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private ingredientsService: IngredientsService) {}

  @Query(() => [Ingredient], { name: 'ingredients' })
  async getIngredients(): Promise<any[]> {
    return this.ingredientsService.getAllIngredients();
  }

  @Mutation(() => Ingredient)
  async createIngredient(
    @Args('name') name: string,
    @Args('quantity') quantity: string,
    @Args('unit') unit: string,
    @Args('recipeId', { type: () => Int }) recipeId: number,
  ): Promise<any> {
    return this.ingredientsService.createIngredient({ name, quantity, unit, recipeId });
  }

  @Mutation(() => Ingredient)
  async updateIngredient(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('quantity', { nullable: true }) quantity?: string,
    @Args('unit', { nullable: true }) unit?: string,
  ): Promise<any> {
    return this.ingredientsService.updateIngredient(id, { name, quantity, unit });
  }

  @Mutation(() => Ingredient)
  async deleteIngredient(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.ingredientsService.deleteIngredient(id);
  }
}