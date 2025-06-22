import { IOrder } from "../entities/order.entity.interface";

export interface IOrderEventPublisher {
  publish(order: IOrder): Promise<void>;
}