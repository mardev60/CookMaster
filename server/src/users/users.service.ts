import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { UserNotFoundException } from './user-not-found.exception';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private recipesService: RecipesService) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { recipes: true },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { recipes: true },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { recipes: true },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async createUser(data: { name: string; email: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: { name?: string; email?: string }): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: { recipes: true }, 
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    await this.recipesService.deleteRecipesByUserId(id);
    const user = await this.prisma.user.delete({
      where: { id },
      include: { recipes: true },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}