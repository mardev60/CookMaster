import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [IngredientsService, IngredientsResolver, PrismaService]
})
export class IngredientsModule {}
