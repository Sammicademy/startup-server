import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(parseInt(process.env.PORT) || 8000);
}
bootstrap();
