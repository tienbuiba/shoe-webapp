import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address-dto';

@Injectable()
export class DeliveryAddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(deliveryAddressWhereInput: Prisma.DeliveryAddressWhereInput) {
    return await this.prisma.deliveryAddress.findFirst({
      where: deliveryAddressWhereInput,
      include: {
        city: true,
        district: true,
        ward: true,
      },
    });
  }

  async create(deliveryAddressCreateArgs: Prisma.DeliveryAddressCreateArgs) {
    return await this.prisma.deliveryAddress.create(deliveryAddressCreateArgs);
  }

  async update(
    id: number,
    userId: number,
    updateDto: UpdateDeliveryAddressDto,
  ) {
    return await this.prisma.deliveryAddress.update({
      where: {
        id: id,
      },
      data: {
        ...updateDto,
        userId: userId,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.deliveryAddress.delete({
      where: {
        id: id,
      },
    });
  }

  async findAllByUser(userId: number) {
    return await this.prisma.deliveryAddress.findMany({
      where: {
        userId: userId,
      },
      include: {
        city: true,
        district: true,
        ward: true,
      },
    });
  }
}
