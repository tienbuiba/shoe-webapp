import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DistrictReferencesService } from './district-references.service';
import { DistrictReferencesController } from './district-references.controller';
import { CityReferencesModule } from 'src/city-references/city-references.module';

@Module({
  imports: [PrismaModule, CityReferencesModule],
  providers: [DistrictReferencesService],
  exports: [DistrictReferencesService],
  controllers: [DistrictReferencesController],
})
export class DistrictReferencesModule {}
