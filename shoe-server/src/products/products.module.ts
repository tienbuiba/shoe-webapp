import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule, CategoriesModule],
  exports: [ProductsService],
})
export class ProductsModule {}
