import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Role, RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { getPreviousDayWithArgFromToday } from 'src/common/helper';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

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
}
