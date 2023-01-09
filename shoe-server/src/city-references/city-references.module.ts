import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CityReferencesService } from './city-references.service';
import { CityReferencesController } from './city-references.controller';

@Module({
  imports: [PrismaModule],
  providers: [CityReferencesService],
  exports: [CityReferencesService],
  controllers: [CityReferencesController],
})
export class CityReferencesModule {}
