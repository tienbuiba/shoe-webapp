import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OrderStatusEnum, Role, RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CartsService } from 'src/carts/carts.service';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import {
  existKeywordInQuery,
  generateOrderCode,
  getAddressOrderFromAddressDelivery,
} from 'src/common/helper';
import { DeliveryAddressesService } from 'src/delivery-addresses/delivery-addresses.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto } from './dto/order-create-dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly cartService: CartsService,
    private readonly productService: ProductsService,
    private readonly deliveryAddressService: DeliveryAddressesService,
  ) {}

  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order' })
  @UseGuards(JwtGuard)
  @Roles(RoleEnum.USER)
  async createOrder(
    @Body() createDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    // check exist address
    const existAddress = await this.deliveryAddressService.findOne({
      id: createDto.addressId,
    });
    if (!existAddress) {
      throw new BadRequestException(
        `Address not found with id ${createDto.addressId}`,
      );
    }
    const cartItems = await this.cartService.findAllByIds(
      createDto.cartIds,
      user.id,
    );
    if (cartItems.length !== createDto.cartIds.length) {
      throw new BadRequestException('Invalid cart ids input');
    }
    const listItems = await Promise.all(
      cartItems.map(async (cart) => {
        const product = await this.productService.findOne({
          id: cart.productId,
        });
        return product;
      }),
    );

    const totalPrice = listItems.reduce((value, product) => {
      return value + product.priceSell;
    }, 0);

    const order = await this.ordersService.create({
      data: {
        userId: user.id,
        address: getAddressOrderFromAddressDelivery(existAddress),
        code: generateOrderCode(),
        items: JSON.stringify(listItems),
        totalPrice: totalPrice,
        status: OrderStatusEnum.WAITING,
      },
    });

    // if create order success => delete carts
    if (order) {
      await this.cartService.deleteMany(createDto.cartIds);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Order successfully!',
      data: order,
    };
  }

  @Post('/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list order of user' })
  @UseGuards(JwtGuard)
  async getListOrder(
    @GetUser() user: User & { role: Role },
    @Body() query: GetListQueryDto,
  ): Promise<IResponse> {
    const limit = isNaN(query.limit) ? 10 : query.limit;
    const offset = isNaN(query.offset) ? 0 : query.offset;
    let orders: any;
    let count: number;
    if (user.role.name === RoleEnum.USER) {
      orders = await this.ordersService.findAll(
        limit,
        offset,
        query.keyword,
        user.id,
      );
      count = await this.ordersService.countNumberRecord(
        query.keyword,
        user.id,
      );
    } else {
      orders = await this.ordersService.findAll(
        limit,
        offset,
        query.keyword,
        null,
      );
      count = await this.ordersService.countNumberRecord(query.keyword, null);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list order successfully!',
      data: {
        items: orders,
        total: count,
      },
    };
  }

  @Post('/cancel/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel order of user' })
  @UseGuards(JwtGuard)
  @ApiQuery({ required: true, name: 'reason' })
  @Roles(RoleEnum.USER)
  async cancelOrder(
    @GetUser() user: User,
    @Param('id') id: number,
    @Query() reason: string,
  ): Promise<IResponse> {
    const existOrder = await this.ordersService.findOne({
      id: id,
      userId: user.id,
    });
    if (!existOrder) {
      throw new BadRequestException(`Order not found with id: ${id}`);
    }
    const cancelOrder = await this.ordersService.update(id, {
      status: OrderStatusEnum.CANCEL,
      cancelReason: reason,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Cancel Order successfully!',
      data: cancelOrder,
    };
  }

  @Post('/admin/update-order-status/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status for admin' })
  @UseGuards(JwtGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiQuery({ required: true, name: 'status' })
  @ApiQuery({ required: false, name: 'reason' })
  async updateOrderStatus(
    @Query() status: OrderStatusEnum,
    @Query() reason: string,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const existOrder = await this.ordersService.findOne({ id: id });
    if (!existOrder) {
      throw new BadRequestException(`Order not found with id: ${id}`);
    }
    let updateOrder: any;
    if (status === OrderStatusEnum.CANCEL) {
      if (!existKeywordInQuery(reason)) {
        throw new BadRequestException(`Reason to cancel order is required!`);
      } else {
        updateOrder = await this.ordersService.update(id, {
          status: OrderStatusEnum.CANCEL,
          cancelReason: reason,
        });
      }
    } else {
      updateOrder = await this.ordersService.update(id, {
        status: status,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Update order status successfully!',
      data: updateOrder,
    };
  }
}
