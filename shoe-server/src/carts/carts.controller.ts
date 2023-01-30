import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IResponse } from 'src/common/dto/response.dto';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart-dto';
import { UpdateCartDto } from './dto/update-cart-dto';

@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
  ) {}

  @Post('/user/create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Add cart' })
  async addCart(
    @GetUser() user: User,
    @Body() createDto: CreateCartDto,
  ): Promise<IResponse> {
    const existProduct = await this.productService.findOne({
      id: createDto.productId,
    });
    if (!existProduct) {
      throw new BadRequestException(
        `Product not found with id: ${createDto.productId}`,
      );
    }
    //check exist cart with same item
    const existCart = await this.cartsService.findOne({
      userId: user.id,
      productId: createDto.productId,
      size: createDto.size,
      color: createDto.color,
    });
    let cartCreate: any;
    if (existCart) {
      cartCreate = await this.cartsService.update(existCart.id, {
        quantity: existCart.quantity + createDto.quantity,
      });
    } else {
      cartCreate = await this.cartsService.create({
        data: {
          ...createDto,
          userId: user.id,
        },
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Add to cart successfully!',
      data: cartCreate,
    };
  }

  @Get('/user/carts')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Get all cart item' })
  async getListCartItems(@GetUser() user: User): Promise<IResponse> {
    const cartItems = await this.cartsService.findAllByUser(user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list cart items successfully!',
      data: cartItems,
    };
  }

  @Post('/user/update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Update cart items' })
  async updateCartItem(
    @Body() updateDto: UpdateCartDto,
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const existCartItem = await this.cartsService.findOne({
      userId: user.id,
      id: id,
    });
    if (!existCartItem) {
      throw new BadRequestException(
        `Cart item not found for user with id: ${id}`,
      );
    }
    if (updateDto.quantity === 0) {
      await this.cartsService.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Update cart successfully!',
      };
    }
    const updateCart = await this.cartsService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update cart successfully!',
      data: updateCart,
    };
  }

  @Delete('/user/delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Delete cart items' })
  async deleteCartItem(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const existCartItem = await this.cartsService.findOne({
      userId: user.id,
      id: id,
    });
    if (!existCartItem) {
      throw new BadRequestException(
        `Cart item not found for user with id: ${id}`,
      );
    }
    const deleteItem = await this.cartsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete cart items successfully!',
      data: deleteItem,
    };
  }
}
