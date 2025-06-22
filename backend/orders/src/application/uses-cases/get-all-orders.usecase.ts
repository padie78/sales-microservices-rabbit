import { Injectable } from '@nestjs/common';
import { IOrder } from '../../domain//interfaces/entities/order.entity.interface';
import { IGetAllOrdersUseCase } from '../../domain/interfaces/uses-cases/get-all-orders.usecase.inteface';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';


@Injectable()
export class GetAllOrdersUseCase implements IGetAllOrdersUseCase{
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<IOrder[]> {
    return this.orderRepository.findAll();
  }
}