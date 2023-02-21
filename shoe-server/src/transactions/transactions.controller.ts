import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrderStatusEnum, Role, RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { getPreviousDayWithArgFromToday } from 'src/common/helper';
import { OrdersService } from 'src/orders/orders.service';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly orderService: OrdersService,
  ) {}

  @Post('/list')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list transaction of user' })
  @ApiQuery({ name: 'from_date', type: String, required: false })
  @ApiQuery({ name: 'to_date', type: String, required: false })
  async getList(
    @GetUser() user: User & { role: Role },
    @Body() query: GetListQueryDto,
    @Query('from_date') fromDate?: string,
    @Query('to_date') toDate?: string,
  ): Promise<IResponse> {
    const limit = isNaN(query.limit) ? 10 : query.limit;
    const offset = isNaN(query.offset) ? 0 : query.offset;
    const from =
      fromDate === undefined
        ? getPreviousDayWithArgFromToday(30)
        : new Date(fromDate);
    const to = toDate === undefined ? new Date() : new Date(toDate);
    const listTransactions = await this.transactionsService.findAll(
      limit,
      offset,
      user.role.name === RoleEnum.ADMIN ? null : user.id,
      query.keyword,
      from,
      to,
    );
    const countRecords = await this.transactionsService.countRecord(
      user.role.name === RoleEnum.ADMIN ? null : user.id,
      query.keyword,
      from,
      to,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list transaction successfully!',
      data: {
        items: listTransactions,
        total: countRecords,
      },
    };
  }
  @Get('/check-order-paied')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check order is paied' })
  @Roles(RoleEnum.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiQuery({ name: 'orderCode', required: true })
  async checkOrderPaied(
    @Query('order_code') orderCode: string,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const existOrder = await this.orderService.findOne({
      userId: user.id,
      code: orderCode,
    });
    if (!existOrder) {
      throw new BadRequestException('Order code not found!');
    }
    //check all transaction for this order
    let result: any;
    const transactions =
      await this.transactionsService.findAllTransactionForOrder(orderCode);
    if (transactions.length > 0) {
      let currentPaid = 0;
      for (const trans of transactions) {
        currentPaid += trans.amount;
      }
      if (currentPaid >= existOrder.totalPrice) {
        await this.orderService.update(existOrder.id, {
          status: OrderStatusEnum.PAIED,
        });
        result = {
          isSuccess: true,
          modAmount: currentPaid - existOrder.totalPrice,
        };
      } else {
        result = {
          isSucess: false,
          modAmount: currentPaid - existOrder.totalPrice,
        };
      }
    } else {
      result = {
        isSucess: false,
        modAmount: 0 - existOrder.totalPrice,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Check successfully!',
      data: result,
    };
  }
}
