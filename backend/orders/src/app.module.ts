import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQOrderPublisher } from './infrastructure/messaging/order.publisher';
import { OrderController } from './presentation/controllers/order.controller';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderMongoRespository } from './infrastructure/repositories/order.mongo.repository';
import { SaveOrderUseCase } from './application/uses-cases/save-order.usecase';
import { GetAllOrdersUseCase } from './application/uses-cases/get-all-orders.usecase';
import { GetOrderByIdUseCase } from './application/uses-cases/get-order-byId.usecase';
import { DelOrderByIdUseCase } from './application/uses-cases/del-order-byId.usecase';

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
  providers: [RabbitMQOrderPublisher,
    {
      provide: 'ISaveOrderUseCase',
      useClass: SaveOrderUseCase,
    },
    {
      provide: 'IGetAllOrdersUseCase',
      useClass: GetAllOrdersUseCase,
    },
    {
      provide: 'IGetOrderByIdUseCase',
      useClass: GetOrderByIdUseCase,
    },
    {
      provide: 'IDelOrderByIdUseCase',
      useClass: DelOrderByIdUseCase,
    },
    {
      provide: 'IOrderRepository',
      useClass: OrderMongoRespository,
    },
  ],
  exports: [RabbitMQOrderPublisher]
})
export class AppModule {}
