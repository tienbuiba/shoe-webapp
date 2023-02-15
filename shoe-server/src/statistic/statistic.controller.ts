import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IResponse } from 'src/common/dto/response.dto';
import { OrdersService } from 'src/orders/orders.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { StatisticService } from './statistic.service';

@Controller('statistic')
@ApiTags('Statistic')
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly transactionService: TransactionsService,
  ) {}

  @Get('/admin/detail')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Statistic API' })
  @ApiQuery({ name: 'days', required: false })
  async statisticDashboard(@Query('days') days?: number): Promise<IResponse> {
    const numDays = days ? days : 1;

    const newUsers = await this.usersService.countNewUser(numDays);
    const newOrders = await this.ordersService.countNewOrder(numDays);
    const newTrans = await this.transactionService.countNewTransaction(numDays);
    const totalRevenue = await this.ordersService.countTotalRevenue(numDays);

    return {
      statusCode: HttpStatus.OK,
      message: 'Statistic successfully',
      data: {
        newUsers: newUsers,
        newOrders: newOrders,
        newTransactions: newTrans,
        totalRevenue: totalRevenue,
      },
    };
  }
}
