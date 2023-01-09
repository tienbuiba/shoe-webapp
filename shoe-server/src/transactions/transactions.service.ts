import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existKeywordInQuery } from 'src/common/helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

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
  ) {
    let listTransactions: any;
    if (userId === null) {
      listTransactions = await this.prisma.transaction.findMany({
        where: {
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
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
  async countRecord(userId: number, keyword: string) {
    let count: any;
    if (userId === null) {
      count = await this.prisma.transaction.count({
        where: {
          message: {
            contains: existKeywordInQuery(keyword) ? keyword : '',
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
        },
      });
    }
    return count;
  }
}
