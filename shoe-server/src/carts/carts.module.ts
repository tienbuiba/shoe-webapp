import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [PrismaModule, ProductsModule],
  exports: [CartsService],
})
export class CartsModule {}
