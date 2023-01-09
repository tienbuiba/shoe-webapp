import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/common/dto/response.dto';
import { CityReferencesService } from './city-references.service';

@Controller('city-references')
@ApiTags('City Reference')
export class CityReferencesController {
  constructor(private readonly cityReferenceService: CityReferencesService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get list city' })
  async getAllCities(): Promise<IResponse> {
    const cities = await this.cityReferenceService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list cities successfully!',
      data: cities,
    };
  }
}
