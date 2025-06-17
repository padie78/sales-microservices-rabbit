import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@rabbit:5672'], // tu URL de RabbitMQ
      queue: 'orders_queue',                      // nombre de la cola a escuchar
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  console.log('✅ Microservicio escuchando RabbitMQ');
}
bootstrap();