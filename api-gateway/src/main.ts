import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'api-gateway-queue',
  },
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.setGlobalPrefix('/api/v1');

  const PORT = process.env.PORT || 8000;

  await app.listen(PORT);
  console.log('Application is running on: ', PORT);
}
bootstrap();
