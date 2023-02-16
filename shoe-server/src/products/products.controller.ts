import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductStatusEnum, RoleEnum } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CategoriesService } from 'src/categories/categories.service';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Post('/list')
  @ApiOperation({ summary: 'Get list product with filter' })
  @ApiBody({ required: false })
  @ApiQuery({ required: false, name: 'categoryId' })
  async getListProduct(
    @Body() query: GetListQueryDto,
    @Query('categoryId') categoryId: number,
  ): Promise<IResponse> {
    const limit = isNaN(query.limit) ? 10 : query.limit;
    const offset = isNaN(query.offset) ? 0 : query.offset;
    if (categoryId !== null && categoryId !== undefined && !isNaN(categoryId)) {
      const existCategory = await this.categoryService.findOne({
        id: categoryId,
      });
      if (!existCategory) {
        throw new BadRequestException(
          `Category not found with id: ${categoryId}`,
        );
      }
    } else {
      categoryId = null;
    }
    const listProducts = await this.productsService.findAll(
      limit,
      offset,
      query.keyword,
      categoryId,
    );
    const numberRecords = await this.productsService.countNumberRecord(
      query.keyword,
      categoryId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list product successfully!',
      data: {
        items: listProducts,
        total: numberRecords,
      },
    };
  }

  @Post('/detail/:id')
  @ApiOperation({ summary: 'Get product by id' })
  async getDetailProduct(@Param('id') id: number): Promise<IResponse> {
    const existProduct = await this.productsService.findOne({
      id: id,
      status: ProductStatusEnum.AVAILABLE,
    });
    if (!existProduct) {
      throw new BadRequestException(`Product not found with id: ${id}`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Get detail product successfully!',
      data: existProduct,
    };
  }

  @Post('/admin/create')
  @ApiOperation({ summary: 'Create product' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async createProduct(@Body() createDto: CreateProductDto): Promise<IResponse> {
    const existCategory = await this.categoryService.findOne({
      id: createDto.categoryId,
    });
    if (!existCategory) {
      throw new BadRequestException(
        `Category not found with id: ${createDto.categoryId}`,
      );
    }
    const product = await this.productsService.create({
      data: {
        ...createDto,
        status: ProductStatusEnum.AVAILABLE,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Create product successfully!',
      data: product,
    };
  }

  @Post('/admin/update/:id')
  @ApiOperation({ summary: 'Update product' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async updateProduct(
    @Body() updateDto: UpdateProductDto,
    @Param('id') id: number,
  ): Promise<IResponse> {
    let product = await this.productsService.findOne({ id: id });
    if (!product) {
      throw new BadRequestException(`Product not found with id: ${id}`);
    }
    product = await this.productsService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update product successfully!',
      data: product,
    };
  }

  @Delete('/admin/delete/:id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async deleteProduct(@Param('id') id: number): Promise<IResponse> {
    let product = await this.productsService.findOne({ id: id });
    if (!product) {
      throw new BadRequestException(`Product not found with id: ${id}`);
    }
    product = await this.productsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete product successfully!',
      data: product,
    };
  }

  @Get('/top-10-best-seller')
  @ApiOperation({ summary: 'Get top 10 best seller products' })
  async top10BestSeller(): Promise<IResponse> {
    const products = await this.productsService.findTop10ProductBestSeller();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get top 10 best seller product successfully!',
      data: products,
    };
  }
}
