import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

export const OrderClientProxy = {
  provide: 'ORDER_CLIENT',
  useFactory: (): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'orders',
        queueOptions: { durable: false },
      },
    });
  },
};
