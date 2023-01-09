import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DistrictReferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(districtWhereInput: Prisma.DistrictReferenceWhereInput) {
    return await this.prisma.districtReference.findFirst({
      where: districtWhereInput,
    });
  }

  async findAll() {
    return await this.prisma.districtReference.findMany();
  }

  async findAllByCity(cityId: number) {
    return await this.prisma.districtReference.findMany({
      where: {
        cityId: cityId,
      },
    });
  }
}
