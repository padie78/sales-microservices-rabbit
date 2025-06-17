import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQOrderConsumer implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  async onModuleInit() {
    try {
      console.log('try to connet to RabbitMQ2:');
      
      await this.client.connect();
    } catch (err) {
      console.error('Error al conecta a RabbitMQ2:', err);
      throw new Error('Falló la conexion con RabbitMQ');
    }  
  }

}



