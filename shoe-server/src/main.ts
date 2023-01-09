import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: {
        target: false,
      },
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const errors = validationErrors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints)[0],
        }));

        return new BadRequestException(errors);
      },
    }),
  );

  /* Cors */
  app.enableCors();

  /* Configs */
  const configService = app.get(ConfigService);

  /* API prefix */
  app.setGlobalPrefix(configService.get('API_PREFIX'), {
    exclude: ['/'],
  });

  /* Swagger */
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Shoes API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
