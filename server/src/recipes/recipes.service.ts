import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRecipeInput } from './dto/create-recipe.input';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getRecipeById(id: number): Promise<any> {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: { author: true, ingredients: true },
    });
  }

  async getAllRecipes(): Promise<any[]> {
    return this.prisma.recipe.findMany({
      include: { author: true }
    });
  }

  async createRecipe(data: { name: string; description: string; instructions: string; authorId: number; ingredients: { name: string; quantity: string; unit: string }[] }): Promise<any> {
    return this.prisma.recipe.create({
      data: {
        name: data.name,
        description: data.description,
        instructions: data.instructions,
        author: { connect: { id: data.authorId } },
        ingredients: {
          create: data.ingredients,
        },
      },
      include: {
        author: true,
        ingredients: true,
      },
    });
  }

  async updateRecipe(id: number, data: { name?: string; description?: string; instructions?: string }): Promise<any> {
    return this.prisma.recipe.update({ where: { id }, data });
  }

  async deleteRecipe(id: number): Promise<any> {
    await this.prisma.ingredient.deleteMany({ where: { recipeId: id } });
    return this.prisma.recipe.delete({ where: { id } });
  }

  async deleteRecipesByUserId(userId: number): Promise<void> {
    const recipes = await this.prisma.recipe.findMany({ where: { authorId: userId } });
    for (const recipe of recipes) {
      await this.deleteRecipe(recipe.id);
    }
  }
}