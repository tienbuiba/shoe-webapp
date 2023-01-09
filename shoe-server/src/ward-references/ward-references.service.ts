import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WardReferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(wardWhereInput: Prisma.WardReferenceWhereInput) {
    return await this.prisma.wardReference.findFirst({ where: wardWhereInput });
  }

  async findAll() {
    return await this.prisma.wardReference.findMany();
  }

  async findAllByDistrict(districtId: number) {
    return await this.prisma.wardReference.findMany({
      where: {
        districtId: districtId,
      },
    });
  }
}
