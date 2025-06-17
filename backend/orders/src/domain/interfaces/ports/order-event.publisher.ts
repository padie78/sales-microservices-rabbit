import { Order } from '../../entities/order.entity';

export interface IOrderEventPublisher {
  publish(order: Order): Promise<void>;
}