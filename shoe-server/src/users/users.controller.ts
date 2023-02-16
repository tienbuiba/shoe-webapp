import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User, UserStatusEnum } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@GetUser() user: User): Promise<IResponse> {
    user.password = '';
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user profile successfully!',
      data: user,
    };
  }

  @Post('admin/update-status')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update status user' })
  async updateStatusUser(@Query('userId') userId: number): Promise<IResponse> {
    let user = await this.usersService.findOne({
      id: userId,
    });
    if (!user) {
      throw new BadRequestException(`User not found with id: ${userId}`);
    }
    user = await this.usersService.updateStatus(
      userId,
      user.status === UserStatusEnum.ACTIVE
        ? UserStatusEnum.BLOCKED
        : UserStatusEnum.ACTIVE,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update status user successfully.',
      data: user,
    };
  }
  @Post('admin/list-users')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get list users' })
  @ApiBearerAuth()
  async getListUsers(@Body() query: GetListQueryDto): Promise<IResponse> {
    const limit = isNaN(query.limit) ? 10 : query.limit;
    const offset = isNaN(query.offset) ? 0 : query.offset;
    const listUser = await this.usersService.findAll(
      limit,
      offset,
      query.keyword,
    );
    const numRecords = await this.usersService.countRecords(query.keyword);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list user successfully.',
      data: {
        items: listUser,
        total: numRecords,
      },
    };
  }

  @Post('/update-profile')
  @ApiOperation({ summary: 'Update information api' })
  @ApiBearerAuth()
  @Roles(RoleEnum.USER)
  @UseGuards(JwtGuard, RolesGuard)
  async updateProfile(
    @Body() updateDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const updateUser = await this.usersService.update(user.id, updateDto);
    updateUser.password = '';
    return {
      statusCode: HttpStatus.OK,
      message: 'Update profile successfully',
      data: updateUser,
    };
  }
}
