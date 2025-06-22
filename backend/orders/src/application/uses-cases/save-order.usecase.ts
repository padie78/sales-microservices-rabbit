import { Injectable } from '@nestjs/common';
import { IOrder } from '../../domain//interfaces/entities/order.entity.interface';
import { ISaveOrderUseCase } from '../../domain/interfaces/uses-cases/save-order.usecase.interface';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';
import { IOrderRequestDTO } from '../../domain/interfaces/dto/request/order.request.dto.interface';
import { RabbitMQOrderPublisher } from '../../infrastructure/messaging/order.publisher';
import { OrderMapper } from '../../shared/mappers/order.mapper';

@Injectable()
export class SaveOrderUseCase implements ISaveOrderUseCase {
  constructor(private readonly publisher: RabbitMQOrderPublisher,
              private readonly orderRespository: IOrderRepository) {}

  async execute(orderRequestDTO: IOrderRequestDTO): Promise<IOrder> {
    const order = OrderMapper.toEntity(orderRequestDTO)
    await this.publisher.publish(order);
    await this.orderRespository.save(order);
    return order;
  }
}