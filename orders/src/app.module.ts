import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQOrderPublisher } from './infrastructure/messaging/order.publisher';
import { OrderController } from './presentation/controllers/order.controller';
import { CreateOrderUseCase } from './application/uses-cases/create-order.usecase';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderRespository } from './infrastructure/repositories/order.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/orders'), // conexión a Mongo
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
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
  controllers: [OrderController],
  providers: [RabbitMQOrderPublisher, OrderRespository, CreateOrderUseCase],
  exports: [RabbitMQOrderPublisher]
})
export class AppModule {}
