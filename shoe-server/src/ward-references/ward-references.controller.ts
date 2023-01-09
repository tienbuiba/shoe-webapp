import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/common/dto/response.dto';
import { DistrictReferencesService } from 'src/district-references/district-references.service';
import { WardReferencesService } from './ward-references.service';

@Controller('ward-references')
@ApiTags('Ward References')
export class WardReferencesController {
  constructor(
    private readonly wardReferenceService: WardReferencesService,
    private readonly districtReferenceService: DistrictReferencesService,
  ) {}

  @Get('list-by-district')
  @ApiOperation({ summary: 'Get list wards by district' })
  async getAllWardsByDistrict(
    @Query('districtId') districtId: number,
  ): Promise<IResponse> {
    const existDistrict = await this.districtReferenceService.findOne({
      id: districtId,
    });
    if (!existDistrict) {
      throw new BadRequestException(
        `District not found with id: ${districtId}`,
      );
    }
    const wards = await this.wardReferenceService.findAllByDistrict(districtId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list wards successfully!',
      data: wards,
    };
  }
}
