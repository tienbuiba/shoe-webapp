import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class CronJobService {
  constructor(private readonly transactionService: TransactionsService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async proccessOrder() {
    await this.transactionService.checkOrderBank();
  }
}
