import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { apiReference } from '@scalar/nestjs-api-reference'; // Import Scalar

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Generate OpenAPI document (same as before)
  const config = new DocumentBuilder()
    .setTitle('Ads Backend API')
    .setDescription('API for managing advertisements')
    .setVersion('1.0')
    .setBasePath('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Keep /api-docs-json endpoint for the raw JSON (optional)
  SwaggerModule.setup('api-docs', app, document);

  // Add Scalar UI at /reference (or any path you prefer)
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document, // Use the OpenAPI document directly
      },
      theme: 'default', // Optional: Customize the look (e.g., 'purple', 'solarized')
    }),
  );

  await app.listen(3000);
}
bootstrap();
