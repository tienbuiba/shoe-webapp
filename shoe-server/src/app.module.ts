import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { CityReferencesModule } from './city-references/city-references.module';
import { DistrictReferencesModule } from './district-references/district-references.module';
import { WardReferencesModule } from './ward-references/ward-references.module';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';
import { DeliveryAddressesModule } from './delivery-addresses/delivery-addresses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CartsModule } from './carts/carts.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { OtpTokensModule } from './otp-tokens/otp-tokens.module';
import { SendMailModule } from './send-mail/send-mail.module';

@Module({
  imports: [
    JwtModule,
    AuthModule,
    PrismaModule,
    UsersModule,
    RolesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule,
    CityReferencesModule,
    DistrictReferencesModule,
    WardReferencesModule,
    PostsModule,
    ProductsModule,
    DeliveryAddressesModule,
    TransactionsModule,
    CartsModule,
    UploadFilesModule,
    OtpTokensModule,
    SendMailModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
