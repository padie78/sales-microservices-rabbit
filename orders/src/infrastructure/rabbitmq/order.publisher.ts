import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IOrderEventPublisher } from '../../domain/interfaces/rabbitmq/order-event.publisher';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class RabbitMQOrderPublisher implements IOrderEventPublisher {
  constructor(@Inject('ORDER_CLIENT') private readonly client: ClientProxy) {}

  async publish(order: Order): Promise<void> {
    await this.client.connect();
    this.client.emit('order_created', order);
  }
}
