import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, TransactionType } from '@prisma/client';
import {
  existKeywordInQuery,
  getPreviousDayWithArgFromToday,
} from 'src/common/helper';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly orderService: OrdersService,
    private readonly httpService: HttpService,
  ) {}

  async findOne(transactionWhereInput: Prisma.TransactionWhereInput) {
    return await this.prisma.transaction.findFirst({
      where: transactionWhereInput,
    });
  }
  async create(transactionCreateArgs: Prisma.TransactionCreateArgs) {
    return await this.prisma.transaction.create(transactionCreateArgs);
  }

  async findAll(
    limit: number,
    offset: number,
    userId: number,
    keyword: string,
    fromDate: Date,
    toDate: Date,
  ) {
    let listTransactions: any;
    if (userId === null) {
      listTransactions = await this.prisma.transaction.findMany({
        where: {
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
          },
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
        take: limit,
        skip: limit * offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      listTransactions = await this.prisma.transaction.findMany({
        where: {
          userId: userId,
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
          },
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
        take: limit,
        skip: limit * offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return listTransactions;
  }
  async countRecord(
    userId: number,
    keyword: string,
    fromDate: Date,
    toDate: Date,
  ) {
    let count: any;
    if (userId === null) {
      count = await this.prisma.transaction.count({
        where: {
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
          },
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
      });
    } else {
      count = await this.prisma.transaction.count({
        where: {
          userId: userId,
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
          },
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
      });
    }
    return count;
  }

  async countNewTransaction(day: number) {
    const timeline = getPreviousDayWithArgFromToday(day);
    return await this.prisma.transaction.count({
      where: {
        createdAt: {
          gte: timeline,
        },
      },
    });
  }

  async checkOrderBank() {
    try {
      const res = await this.httpService.axiosRef.post(
        `https://api.web2m.com/historyapimbv3/${this.configService.get(
          'PASSWORD_MBB',
        )}/${this.configService.get(
          'ACCOUNT_NUMBER_MBB',
        )}/${this.configService.get('TOKEN_MBB')}`,
      );
      const { transactions } = res.data;
      const unprocessedTransactions = await transactions.reduce(
        async (previous: any, current: any) => {
          const previousValue = await previous;
          const currentValue = await current;
          const transactionExisted = await this.prisma.transaction.findFirst({
            where: {
              transactionCode: currentValue.transactionID.toString(),
            },
          });
          if (
            !transactionExisted &&
            currentValue.description.includes('PAYMENT')
          ) {
            previousValue.push(current);
          }
          return previousValue;
        },
        Promise.resolve([]),
      );

      for (const transaction of unprocessedTransactions) {
        const orderCode =
          transaction.description.length > 0
            ? transaction.description
                .match(/PAYMENT ([A-Z0-9]{14})/g)[0]
                .slice(-14)
            : null;
        if (!orderCode) {
          continue;
        }
        const order = await this.orderService.findOne({ code: orderCode });
        if (order) {
          // create transaction
          await this.prisma.transaction.create({
            data: {
              type: TransactionType.BANK,
              amount: parseInt(transaction.amount),
              message: transaction.description,
              userId: order.userId,
              createdAt: new Date(),
              transactionCode: transaction.transactionID.toString(),
              orderCode: orderCode,
            },
          });
        }
      }
    } catch (error) {
      console.log('Get data bank err: ', error);
      // this.logger.debug(error);
    }
  }

  async findAllTransactionForOrder(orderCode: string) {
    return await this.prisma.transaction.findMany({
      where: {
        orderCode: orderCode,
      },
    });
  }
}
