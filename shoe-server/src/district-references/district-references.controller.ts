import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityReferencesService } from 'src/city-references/city-references.service';
import { IResponse } from 'src/common/dto/response.dto';
import { DistrictReferencesService } from './district-references.service';

@Controller('district-references')
@ApiTags('District References')
export class DistrictReferencesController {
  constructor(
    private readonly districtReferenceService: DistrictReferencesService,
    private readonly cityReferenceService: CityReferencesService,
  ) {}

  @Get('list-by-city')
  @ApiOperation({ summary: 'Get list districts' })
  async getAllDistrictsByCity(
    @Query('cityId') cityId: number,
  ): Promise<IResponse> {
    const existCity = await this.cityReferenceService.findOne({
      id: cityId,
    });
    if (!existCity) {
      throw new BadRequestException(`City not found with id: ${cityId}`);
    }
    const districts = await this.districtReferenceService.findAllByCity(cityId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list districts successfully!',
      data: districts,
    };
  }
}
