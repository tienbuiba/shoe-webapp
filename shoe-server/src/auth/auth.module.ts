import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SendMailModule } from 'src/send-mail/send-mail.module';
import { OtpTokensModule } from 'src/otp-tokens/otp-tokens.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('AUTH_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
    UsersModule,
    RolesModule,
    SendMailModule,
    OtpTokensModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
