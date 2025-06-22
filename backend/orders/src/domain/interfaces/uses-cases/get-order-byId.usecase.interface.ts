import { IOrder } from "../entities/order.entity.interface";

export interface IGetOrderByIdUseCase {
    execute(id: string): Promise<IOrder>;
}
