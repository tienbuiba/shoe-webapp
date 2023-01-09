import { Module } from '@nestjs/common';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { DeliveryAddressesController } from './delivery-addresses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CityReferencesModule } from 'src/city-references/city-references.module';
import { DistrictReferencesModule } from 'src/district-references/district-references.module';
import { WardReferencesModule } from 'src/ward-references/ward-references.module';

@Module({
  controllers: [DeliveryAddressesController],
  providers: [DeliveryAddressesService],
  imports: [
    PrismaModule,
    CityReferencesModule,
    DistrictReferencesModule,
    WardReferencesModule,
  ],
  exports: [DeliveryAddressesService],
})
export class DeliveryAddressesModule {}
