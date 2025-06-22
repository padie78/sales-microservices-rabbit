import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';
import { IDelOrderByIdUseCase } from '../../domain/interfaces/uses-cases/del-order-byId.usecase.interface';

@Injectable()
export class DelOrderByIdUseCase implements IDelOrderByIdUseCase {
  constructor(@Inject('IOrderRepository') private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<void> {
    const wasDeleted = await this.orderRepository.delById(id);

    if (!wasDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
