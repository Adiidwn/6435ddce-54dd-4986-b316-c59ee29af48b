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
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  setupSwagger(app);
  await app.listen();
}
bootstrap();
