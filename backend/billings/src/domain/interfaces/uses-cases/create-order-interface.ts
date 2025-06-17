import { IOrder } from '../entities/order.interface';

export interface ICreateOrderUseCase {
  execute(item: string, quantity: number): Promise<IOrder>;
}