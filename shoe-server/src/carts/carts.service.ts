import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCartDto } from './dto/update-cart-dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(cartWhereInput: Prisma.CartWhereInput) {
    return await this.prisma.cart.findFirst({
      where: cartWhereInput,
    });
  }

  async findAllByIds(ids: Array<number>, userId: number) {
    return await this.prisma.cart.findMany({
      where: {
        id: {
          in: ids,
        },
        userId: userId,
      },
    });
  }

  async create(cartCreateArgs: Prisma.CartCreateArgs) {
    return await this.prisma.cart.create(cartCreateArgs);
  }

  async findAllByUser(userId: number) {
    return await this.prisma.cart.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async update(id: number, updateDto: UpdateCartDto) {
    return await this.prisma.cart.update({
      where: {
        id: id,
      },
      data: updateDto,
    });
  }

  async delete(id: number) {
    return await this.prisma.cart.delete({
      where: {
        id: id,
      },
    });
  }
}
