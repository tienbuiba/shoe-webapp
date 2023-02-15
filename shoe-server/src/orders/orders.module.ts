import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DeliveryAddressesModule } from 'src/delivery-addresses/delivery-addresses.module';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [PrismaModule, DeliveryAddressesModule, CartsModule, ProductsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
