import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { CronJobService } from './cron-job.service';

@Module({
  providers: [CronJobService],
  imports: [TransactionsModule],
})
export class CronJobModule {}
