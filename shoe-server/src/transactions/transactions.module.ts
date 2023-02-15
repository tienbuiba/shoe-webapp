import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersModule } from 'src/orders/orders.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [PrismaModule, OrdersModule, HttpModule],
  exports: [TransactionsService],
})
export class TransactionsModule {}
