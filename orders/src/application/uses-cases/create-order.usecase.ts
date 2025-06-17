import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { ICreateOrderUseCase } from '../../domain/interfaces/uses-cases/create-order-interface';
import { RabbitMQOrderPublisher } from 'src/infrastructure/messaging/order.publisher';
import { OrderRespository } from 'src/infrastructure/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly publisher: RabbitMQOrderPublisher,
              private readonly orderRespository: OrderRespository      
  ) {}

  async execute(item: string, quantity: number): Promise<Order> {
    const order = new Order(item, quantity);
    await this.publisher.publish(order); // << se encarga de emitir el evento
    await this.orderRespository.create(order); // << se encarga de guardar el pedido en la base de datos
    return order;
  }
}