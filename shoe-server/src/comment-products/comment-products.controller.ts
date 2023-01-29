import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role, RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IResponse } from 'src/common/dto/response.dto';
import { ProductsService } from 'src/products/products.service';
import { CommentProductsService } from './comment-products.service';
import { CreateCommentProductDto } from './dto/create-comment-product.dto';

@Controller('comment-products')
@ApiTags('Comment Products')
export class CommentProductsController {
  constructor(
    private readonly commentProductsService: CommentProductsService,
    private readonly productService: ProductsService,
  ) {}

  @Get('/list-comments')
  @ApiOperation({ summary: 'List comment in product' })
  @ApiQuery({ required: true, name: 'productId' })
  async getListComment(
    @Query('productId') productId: number,
  ): Promise<IResponse> {
    const existProduct = await this.productService.findOne({
      id: productId,
    });
    if (!existProduct) {
      throw new BadRequestException(`Product not found with id: ${productId}`);
    }
    const comments = await this.commentProductsService.findAll({
      productId: productId,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Get list comment in this product successfully!',
      data: comments,
    };
  }

  @Post('/comment')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Comment in product after order' })
  @UseGuards(JwtGuard)
  @Roles(RoleEnum.USER)
  @ApiQuery({ required: true, name: 'productId' })
  async commentInProduct(
    @Query('productId') productId: number,
    @Body() createDto: CreateCommentProductDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const existProduct = await this.productService.findOne({
      id: productId,
    });
    if (!existProduct) {
      throw new BadRequestException(`Product not found with id: ${productId}`);
    }
    const comment = await this.commentProductsService.create({
      data: {
        productId: productId,
        userId: user.id,
        content: createDto.content,
        ratingStar: createDto.ratingStar,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Comment in this product successfully!',
      data: comment,
    };
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @UseGuards(JwtGuard)
  @ApiParam({ required: true, name: 'id' })
  async deleteComment(
    @Param('id') id: number,
    @GetUser() user: User & { role: Role },
  ): Promise<IResponse> {
    const existComment = await this.commentProductsService.findOne({ id: id });
    if (!existComment) {
      throw new BadRequestException(`Comment Product not found with id: ${id}`);
    }
    if (user.role.name !== RoleEnum.ADMIN && user.id !== existComment.userId) {
      throw new ForbiddenException(`You dont have permission in this resource`);
    }
    await this.commentProductsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete comment successfully!',
    };
  }
}
