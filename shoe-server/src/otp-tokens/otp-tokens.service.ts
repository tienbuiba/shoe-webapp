import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtpTokensService {
  constructor(private prisma: PrismaService) {}

  async create(otpTokenCreateArgs: Prisma.OtpTokenCreateArgs) {
    return await this.prisma.otpToken.create(otpTokenCreateArgs);
  }

  async findOne(otpTokenWhereInput: Prisma.OtpTokenWhereInput) {
    return await this.prisma.otpToken.findFirst({
      where: otpTokenWhereInput,
    });
  }

  async updateUsedOk(id: number) {
    return await this.prisma.otpToken.update({
      where: {
        id: id,
      },
      data: {
        usedOk: 1,
      },
    });
  }
}
