import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin123@rabbitmq:5672'],
      queue: 'create_asset',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  console.log('Worker is listening on RabbitMQ queue: create_asset');
}
bootstrap();