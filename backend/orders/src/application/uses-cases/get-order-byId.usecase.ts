import { Injectable, NotFoundException } from '@nestjs/common';
import { IGetOrderByIdUseCase } from '../../domain/interfaces/uses-cases/get-order-byId.usecase.interface';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';
import { IOrder } from '../../domain//interfaces/entities/order.entity.interface';

@Injectable()
export class GetOrderByIdUseCase implements IGetOrderByIdUseCase{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
}
