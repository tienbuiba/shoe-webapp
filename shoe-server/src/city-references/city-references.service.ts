import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityReferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(cityWhereInput: Prisma.CityReferenceWhereInput) {
    return await this.prisma.cityReference.findFirst({ where: cityWhereInput });
  }

  async findAll() {
    return await this.prisma.cityReference.findMany();
  }
}
