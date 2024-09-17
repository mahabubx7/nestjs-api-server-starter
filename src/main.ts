import { env } from '@config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { port, host } = env(); // environment variables
  const app = await NestFactory.create(AppModule);
  app.enableVersioning(); // enables API versioning
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // auto request-validator middleware
  await app.listen(port, host);
}

bootstrap();
