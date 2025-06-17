import { Order } from '../../entities/order.entity';

export interface IOrderEventConsumer {
  publish(order: Order): Promise<void>;
}