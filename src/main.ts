import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve custom Swagger UI static files
  app.useStaticAssets(join(__dirname, '..', 'public', 'swagger-ui'), {
    prefix: '/api-docs',
  });

  const config = new DocumentBuilder()
    .setTitle('Ads Backend API')
    .setDescription('API for managing advertisements')
    .setVersion('1.0')
    .setBasePath('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Still setup the JSON endpoint
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
