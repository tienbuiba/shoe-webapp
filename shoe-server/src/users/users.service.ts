import { Injectable } from '@nestjs/common';
import { Prisma, RoleEnum, UserStatusEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    userWhereInput: Prisma.UserWhereInput,
    userInclude?: Prisma.UserInclude,
  ) {
    const user = await this.prisma.user.findFirst({
      where: userWhereInput,
      include: userInclude,
    });

    return user;
  }

  async create(userCreateArgs: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(userCreateArgs);
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto & { password?: string },
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return user;
  }
  async updateStatus(id: number, status: UserStatusEnum) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
  async findAll(limit: number, offset: number, keyword: string) {
    let listUser: any;
    if (keyword === undefined || keyword === '') {
      listUser = await this.prisma.user.findMany({
        take: limit,
        skip: limit * offset,
        select: {
          id: true,
          role: true,
          username: true,
          email: true,
          status: true,
          createdAt: true,
          phone: true,
        },
      });
    } else {
      listUser = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: keyword,
              },
            },
            {
              email: {
                contains: keyword,
              },
            },
          ],
        },
        take: limit,
        skip: limit * offset,
        select: {
          id: true,
          role: true,
          username: true,
          email: true,
          status: true,
          createdAt: true,
          phone: true,
        },
      });
    }
    return listUser;
  }

  async countRecords(keyword: string) {
    let count: any;
    if (keyword === undefined || keyword === '') {
      count = await this.prisma.user.count();
    } else {
      count = await this.prisma.user.count({
        where: {
          OR: [
            {
              username: {
                contains: keyword,
              },
            },
            {
              email: {
                contains: keyword,
              },
            },
          ],
        },
      });
    }
    return count;
  }

  async findUserByRole(role: RoleEnum) {
    return await this.prisma.user.findMany({
      where: {
        role: {
          name: role,
        },
      },
    });
  }
}
