import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [UsersModule, OrdersModule, TransactionsModule],
})
export class StatisticModule {}
