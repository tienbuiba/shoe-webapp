import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existKeywordInQuery } from 'src/common/helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(productWhereInput: Prisma.ProductWhereInput) {
    return await this.prisma.product.findFirst({
      where: productWhereInput,
    });
  }

  async create(productCreateArgs: Prisma.ProductCreateArgs) {
    return await this.prisma.product.create(productCreateArgs);
  }

  async update(id: number, productDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: productDto,
    });
  }

  async delete(id: number) {
    return await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    categoryId: number,
    filter: any,
  ) {
    let listProducts: any;
    if (categoryId === null) {
      if (!existKeywordInQuery(keyword)) {
        listProducts = await this.prisma.product.findMany({
          where: filter,
          take: limit,
          skip: limit * offset,
          orderBy: {
            createdAt: 'asc',
          },
        });
      } else {
        listProducts = await this.prisma.product.findMany({
          where: {
            ...filter,
            OR: [
              {
                name: { contains: keyword },
              },
              {
                shortDesc: { contains: keyword },
              },
              {
                longDesc: { contains: keyword },
              },
            ],
          },
          take: limit,
          skip: limit * offset,
          orderBy: {
            createdAt: 'asc',
          },
        });
      }
    } else {
      if (!existKeywordInQuery(keyword)) {
        listProducts = await this.prisma.product.findMany({
          where: {
            categoryId: categoryId,
            ...filter,
          },
          take: limit,
          skip: limit * offset,
          orderBy: {
            createdAt: 'asc',
          },
        });
      } else {
        listProducts = await this.prisma.product.findMany({
          where: {
            categoryId: categoryId,
            OR: [
              {
                name: { contains: keyword },
              },
              {
                shortDesc: { contains: keyword },
              },
              {
                longDesc: { contains: keyword },
              },
            ],
            ...filter,
          },
          take: limit,
          skip: limit * offset,
          orderBy: {
            createdAt: 'asc',
          },
        });
      }
    }
    return listProducts;
  }
  async countNumberRecord(keyword: string, categoryId: number, filter: any) {
    let listProducts: any;
    if (categoryId === null) {
      if (!existKeywordInQuery(keyword)) {
        listProducts = await this.prisma.product.count({ where: filter });
      } else {
        listProducts = await this.prisma.product.count({
          where: {
            ...filter,
            OR: [
              {
                name: { contains: keyword },
              },
              {
                shortDesc: { contains: keyword },
              },
              {
                longDesc: { contains: keyword },
              },
            ],
          },
        });
      }
    } else {
      if (!existKeywordInQuery(keyword)) {
        listProducts = await this.prisma.product.count({
          where: {
            categoryId: categoryId,
            ...filter,
          },
        });
      } else {
        listProducts = await this.prisma.product.count({
          where: {
            ...filter,
            categoryId: categoryId,
            OR: [
              {
                name: { contains: keyword },
              },
              {
                shortDesc: { contains: keyword },
              },
              {
                longDesc: { contains: keyword },
              },
            ],
          },
        });
      }
    }
    return listProducts;
  }
  async findTop10ProductBestSeller() {
    return await this.prisma.product.findMany({
      orderBy: {
        sold: 'desc',
      },
      take: 10,
    });
  }

  async getListBrand() {
    const brands = await this.prisma.product.findMany({
      select: {
        brand: true,
      },
      distinct: ['brand'],
    });
    return brands.map(({ brand }) => brand);
  }
}
