import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OtpTokensService } from './otp-tokens.service';

@Module({
  imports: [PrismaModule],
  providers: [OtpTokensService],
  exports: [OtpTokensService],
})
export class OtpTokensModule {}
