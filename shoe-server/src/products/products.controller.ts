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
  @ApiBody({ required: false, type: GetListQueryDto })
  @ApiQuery({ required: false, name: 'categoryId' })
  @ApiQuery({ required: false, name: 'brand' })
  @ApiQuery({ required: false, name: 'size' })
  @ApiQuery({ required: false, name: 'price' })
  @ApiQuery({ required: false, name: 'color' })
  async getListProduct(
    @Body() query: GetListQueryDto,
    @Query('categoryId') categoryId: number,
    @Query('brand') brand: string,
    @Query('size') size: string,
    @Query('price') price: string,
    @Query('color') color: string,
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
    let filter = {};
    const brands = brand
      ? brand.includes(',')
        ? brand.split(',')
        : [brand]
      : [];
    const sizes = size
      ? size.includes(',')
        ? size.split(',').map((value) => parseInt(value))
        : [parseInt(size)]
      : [];
    const prices = price
      ? price.includes(',')
        ? price.split(',').map((value) => parseInt(value))
        : [parseInt(price)]
      : [];
    const colors = color
      ? color.includes(',')
        ? color.split(',')
        : [color]
      : [];
    if (brands.length > 0) {
      filter = { ...filter, brand: { in: brands } };
    }
    if (sizes.length > 0) {
      filter = { ...filter, size: { array_contains: sizes } };
    }
    if (prices.length > 0) {
      if (prices.length === 1) {
        filter = { ...filter, priceSell: { gte: prices[0] } };
      } else {
        filter = { ...filter, priceSell: { gte: prices[0], lte: prices[1] } };
      }
    }
    if (colors.length > 0) {
      filter = { ...filter, color: { array_contains: colors } };
    }
    const listProducts = await this.productsService.findAll(
      limit,
      offset,
      query.keyword,
      categoryId,
      filter,
    );
    const numberRecords = await this.productsService.countNumberRecord(
      query.keyword,
      categoryId,
      filter,
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

  @Get('/list-brand')
  @ApiOperation({ summary: 'Get list brand of products' })
  async getListBrand(): Promise<IResponse> {
    const brands = await this.productsService.getListBrand();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list brand successfully!',
      data: brands,
    };
  }
}
