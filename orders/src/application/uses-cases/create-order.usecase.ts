import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { ICreateOrderUseCase } from '../../domain/interfaces/uses-cases/create-order-interface';
import { RabbitMQOrderPublisher } from 'src/infrastructure/messaging/order.publisher';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly publisher: RabbitMQOrderPublisher) {}

  async execute(item: string, quantity: number): Promise<Order> {
    const order = new Order(Date.now().toString(), item, quantity);
    await this.publisher.publish(order); // << se encarga de emitir el evento
    return order;
  }
}