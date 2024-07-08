import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Ingredient } from '@prisma/client';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async createIngredient(data: { name: string; quantity: string; unit: string; recipeId: number }): Promise<Ingredient> {
    return this.prisma.ingredient.create({ data });
  }

  async updateIngredient(id: number, data: { name?: string; quantity?: string; unit?: string }): Promise<Ingredient> {
    return this.prisma.ingredient.update({ where: { id }, data });
  }

  async deleteIngredient(id: number): Promise<Ingredient> {
    return this.prisma.ingredient.delete({ where: { id } });
  }
}