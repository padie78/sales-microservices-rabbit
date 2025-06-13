import { Order } from '../../domain/entities/order.entity';
import { ICreateOrderUseCase } from '../../domain/interfaces/uses-cases/create-order-interface';
import { IOrderEventPublisher } from '../../domain/interfaces/rabbitmq/order-event.publisher';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly publisher: IOrderEventPublisher) {}

  async execute(item: string, quantity: number): Promise<Order> {
    const order = new Order(Date.now().toString(), item, quantity);
    await this.publisher.publish(order); // << se encarga de emitir el evento
    return order;
  }
}