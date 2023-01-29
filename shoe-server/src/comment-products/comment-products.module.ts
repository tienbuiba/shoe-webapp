import { Module } from '@nestjs/common';
import { CommentProductsService } from './comment-products.service';
import { CommentProductsController } from './comment-products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CommentProductsController],
  providers: [CommentProductsService],
  imports: [PrismaModule, ProductsModule],
})
export class CommentProductsModule {}
