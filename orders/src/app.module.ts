import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQOrderPublisher } from './infrastructure/messaging/order.publisher';
import { OrderController } from './presentation/controllers/order.controller';
import { CreateOrderUseCase } from './application/uses-cases/create-order.usecase';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE', // Nombre del cliente
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'], // host y puerto de RabbitMQ
          queue: 'orders_queue',          // nombre de la cola
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [RabbitMQOrderPublisher, CreateOrderUseCase],
  exports: [RabbitMQOrderPublisher]
})
export class AppModule {}
