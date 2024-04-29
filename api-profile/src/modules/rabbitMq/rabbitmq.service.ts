import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly connection: Promise<amqp.Connection>;

  constructor() {
    this.connection = amqp.connect('amqp://localhost');
  }

  async sendMessage(queue: string, message: any) {
    const channel = await (await this.connection).createChannel();
    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queue ${queue}:`, message);
    await channel.close();
  }
}
