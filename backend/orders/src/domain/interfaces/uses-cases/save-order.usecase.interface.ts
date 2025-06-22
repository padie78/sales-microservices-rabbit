import { IOrderRequestDTO } from '../dto/request/order.request.dto.interface';
import { IOrder } from '../entities/order.entity.interface';

export interface ISaveOrderUseCase {
  execute(orderRequestDTO: IOrderRequestDTO): Promise<IOrder>;
}