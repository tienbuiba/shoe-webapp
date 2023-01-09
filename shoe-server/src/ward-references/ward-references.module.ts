import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WardReferencesService } from './ward-references.service';
import { WardReferencesController } from './ward-references.controller';
import { DistrictReferencesModule } from 'src/district-references/district-references.module';

@Module({
  imports: [PrismaModule, DistrictReferencesModule],
  providers: [WardReferencesService],
  exports: [WardReferencesService],
  controllers: [WardReferencesController],
})
export class WardReferencesModule {}
