import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private recipesService: RecipesService) {}

  @Query(() => Recipe, { name: 'recipe' })
  async getRecipe(@Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    return this.recipesService.getRecipeById(id);
  }

  @Query(() => [Recipe], { name: 'recipes' })
  async getRecipes(): Promise<Recipe[]> {
    return this.recipesService.getAllRecipes();
  }

  @Mutation(() => Recipe)
  async createRecipe(@Args('createRecipeInput') createRecipeInput: CreateRecipeInput): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipeInput);
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ): Promise<Recipe> {
    return this.recipesService.updateRecipe(id, updateRecipeInput);
  }

  @Mutation(() => Recipe)
  async deleteRecipe(@Args('id', { type: () => Int }) id: number): Promise<Recipe> {
    return this.recipesService.deleteRecipe(id);
  }
}