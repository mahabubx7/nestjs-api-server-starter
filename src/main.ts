import { env } from '@config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const { port, host } = env(); // environment variables
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI }); // enables API versioning
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // auto request-validator middleware

  // swagger - openAPI setup
  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The todo API description')
    .setVersion('1.0')
    // .addServer('http://')
    .addTag('Todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: 'api-docs/json',
  });

  await app.listen(port, host);
}

bootstrap();
