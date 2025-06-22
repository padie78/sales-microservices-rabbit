import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQOrderConsumer } from './infrastructure/messaging/billing.consumer';
import { BillingController } from './presentation/controllers/billing.controller';
import { ProcessOrderUseCase } from './application/uses-cases/process-order.usecase';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE', // Nombre del cliente
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbit:5672'], // host y puerto de RabbitMQ
          queue: 'orders_queue',          // nombre de la cola
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [BillingController],
  providers: [RabbitMQOrderConsumer, ProcessOrderUseCase],
  exports: [RabbitMQOrderConsumer]
})
export class AppModule {}
