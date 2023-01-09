import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('list')
  @ApiOperation({ summary: 'Get list categories' })
  async getListCategory(@Body() query: GetListQueryDto): Promise<IResponse> {
    const limit = isNaN(query.limit) ? 10 : query.limit;
    const offset = isNaN(query.offset) ? 0 : query.offset;
    const categories = await this.categoriesService.findAll(
      limit,
      offset,
      query.keyword,
    );
    const numberRecords = await this.categoriesService.countNumberRecord(
      query.keyword,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list categories successfully!',
      data: {
        items: categories,
        total: numberRecords,
      },
    };
  }

  @Post('/admin/create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create category' })
  async createCategory(@Body() categoryDto: CategoryDto): Promise<IResponse> {
    const category = await this.categoriesService.create({
      data: categoryDto,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Create category successfully!',
      data: category,
    };
  }

  @Post('/admin/update/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update category' })
  @ApiBearerAuth()
  async updateCategory(
    @Param('id') id: number,
    @Body() updateDto: CategoryDto,
  ): Promise<IResponse> {
    let existCategory = await this.categoriesService.findOne({
      id: id,
    });
    if (!existCategory) {
      throw new BadRequestException(`Category not found with id: ${id}`);
    }
    existCategory = await this.categoriesService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update category successfully!',
      data: existCategory,
    };
  }

  @Delete('/admin/delete/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete category' })
  async deleteCategory(@Param('id') id: number): Promise<IResponse> {
    const existCategory = await this.categoriesService.findOne({
      id: id,
    });
    if (!existCategory) {
      throw new BadRequestException(`Category not found with id: ${id}`);
    }
    await this.categoriesService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update category successfully!',
    };
  }
}
