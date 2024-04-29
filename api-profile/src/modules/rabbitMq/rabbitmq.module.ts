import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService], // Export the RabbitMQService to make it available to other modules
})
export class RabbitMQModule {}
