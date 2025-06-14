// src/infrastructure/messaging/rabbitmq-order.publisher.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQOrderPublisher implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (err) {
      console.error('Error al conecta a RabbitMQ2:', err);
      throw new Error('Falló la conexion con RabbitMQ');
    }  
  }

  async publish(order: any): Promise<void> {
    try {
      const result = await this.client.send('create_order', order).toPromise();
      return result;
    } catch (err) {
      console.error('Error al enviar a RabbitMQ:', err);
      throw new Error('Falló la comunicación con RabbitMQ');
    }  
  }
}