import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CityReferencesService } from 'src/city-references/city-references.service';
import { IResponse } from 'src/common/dto/response.dto';
import { DistrictReferencesService } from 'src/district-references/district-references.service';
import { WardReferencesService } from 'src/ward-references/ward-references.service';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address-dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address-dto';

@Controller('delivery-addresses')
@ApiTags('Delivery Addresses')
export class DeliveryAddressesController {
  constructor(
    private readonly deliveryAddressesService: DeliveryAddressesService,
    private readonly cityReferenceService: CityReferencesService,
    private readonly districtReferenceService: DistrictReferencesService,
    private readonly wardReferenceService: WardReferencesService,
  ) {}

  @Get('/user/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list delivery address by user' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async getListByUser(@GetUser() user: User): Promise<IResponse> {
    const listAddress = await this.deliveryAddressesService.findAllByUser(
      user.id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list delivery address successfully!',
      data: listAddress,
    };
  }

  @Get('/user/detail/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list delivery address by user' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async getOneByUser(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const address = await this.deliveryAddressesService.findOne({
      userId: user.id,
      id: id,
    });
    if (!address) {
      throw new BadRequestException(
        `Delivery address not found with id: ${id} of this user`,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list delivery address successfully!',
      data: address,
    };
  }

  @Post('/user/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create delivery address' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async addDeliveryAddress(
    @Body() createDto: CreateDeliveryAddressDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const existCity = await this.cityReferenceService.findOne({
      id: createDto.cityId,
    });
    if (!existCity) {
      throw new BadRequestException(
        `City not found with id: ${createDto.cityId}`,
      );
    }
    const existDistrict = await this.districtReferenceService.findOne({
      id: createDto.districtId,
    });
    if (!existDistrict) {
      throw new BadRequestException(
        `District not found with id: ${createDto.districtId}`,
      );
    }
    const existWard = await this.wardReferenceService.findOne({
      id: createDto.wardId,
    });
    if (!existWard) {
      throw new BadRequestException(
        `Ward not found with id: ${createDto.wardId}`,
      );
    }
    const address = await this.deliveryAddressesService.create({
      data: {
        ...createDto,
        userId: user.id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Add delivery address successfully!',
      data: address,
    };
  }

  @Post('/user/update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create delivery address' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async updateDeliveryAddress(
    @GetUser() user: User,
    @Body() updateDto: UpdateDeliveryAddressDto,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const address = await this.deliveryAddressesService.findOne({
      userId: user.id,
      id: id,
    });
    if (!address) {
      throw new BadRequestException(
        `Delivery address not found with id: ${id} of this user`,
      );
    }
    if (updateDto.cityId !== null && updateDto.cityId !== undefined) {
      const existCity = await this.cityReferenceService.findOne({
        id: updateDto.cityId,
      });
      if (!existCity) {
        throw new BadRequestException(
          `City not found with id: ${updateDto.cityId}`,
        );
      }
    }
    if (updateDto.districtId !== null && updateDto.districtId !== undefined) {
      const existDistrict = await this.districtReferenceService.findOne({
        id: updateDto.districtId,
      });
      if (!existDistrict) {
        throw new BadRequestException(
          `District not found with id: ${updateDto.districtId}`,
        );
      }
    }
    if (updateDto.wardId !== null && updateDto.wardId !== undefined) {
      const existWard = await this.wardReferenceService.findOne({
        id: updateDto.wardId,
      });
      if (!existWard) {
        throw new BadRequestException(
          `Ward not found with id: ${updateDto.wardId}`,
        );
      }
    }

    const updateAddress = await this.deliveryAddressesService.update(
      id,
      user.id,
      updateDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update delivery address successfully!',
      data: updateAddress,
    };
  }

  @Delete('/user/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete delivery address' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  async deleteDeliveryAddress(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<IResponse> {
    const address = await this.deliveryAddressesService.findOne({
      userId: user.id,
      id: id,
    });
    if (!address) {
      throw new BadRequestException(
        `Delivery address not found with id: ${id} of this user`,
      );
    }
    const deleteAddress = await this.deliveryAddressesService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete address successfully!',
      data: deleteAddress,
    };
  }
}
