import { CreateOrderCommand } from 'src/application/commands/create-order.command';
import { IOrder } from '../entities/order.entity.interface';

export interface ICreateOrderUseCase {
  execute(command: CreateOrderCommand): Promise<IOrder>;
}