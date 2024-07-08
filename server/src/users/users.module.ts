import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Module({
  providers: [UsersService, UsersResolver, PrismaService, RecipesService]
})
export class UsersModule {}
