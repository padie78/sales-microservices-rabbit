import { IOrder } from '../entities/order.entity.interface';

export interface IGetAllOrdersUseCase {
   execute(): Promise<IOrder[]>;
}