// order-service/src/app.module.ts

import { Module } from '@nestjs/common';
import { OrderController } from './presentation/controllers/order.controller';
import { CreateOrderUseCase } from './application/uses-cases/create-order.usecase';
import { RabbitMQOrderPublisher } from './infrastructure/rabbitmq/order.publisher';
import { OrderClientProxy } from './infrastructure/rabbitmq/rabbitmq.client';

@Module({
  controllers: [OrderController],
  providers: [
    OrderClientProxy,
    {
      provide: 'OrderEventPublisher',
      useClass: RabbitMQOrderPublisher,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (publisher: RabbitMQOrderPublisher) => new CreateOrderUseCase(publisher),
      inject: ['OrderEventPublisher'],
    },
  ],
})
export class AppModule {}
