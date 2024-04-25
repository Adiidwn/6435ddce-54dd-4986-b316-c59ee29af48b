import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT;

  await app.listen(PORT);
  console.log(`Application is running on: ${PORT}`);
}
bootstrap();
