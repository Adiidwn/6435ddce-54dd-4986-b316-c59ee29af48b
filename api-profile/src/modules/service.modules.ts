import { Module } from '@nestjs/common';
import { ProfileModule } from './Profile/profile.module';
import { RabbitMQModule } from './rabbitMq/rabbitmq.module';

@Module({
  imports: [ProfileModule, RabbitMQModule],
})
export class ServiceModules {}
