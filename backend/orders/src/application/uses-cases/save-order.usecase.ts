import { Injectable } from '@nestjs/common';
import { IOrder } from '../../domain//interfaces/entities/order.entity.interface';
import { ICreateOrderUseCase } from '../../domain/interfaces/uses-cases/create-order.usecase.interface';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';
import { IOrderRequestDTO } from '../../domain/interfaces/dto/request/order.request.dto.interface';
import { RabbitMQOrderPublisher } from '../../infrastructure/messaging/order.publisher';
import { OrderMapper } from '../../shared/mappers/order.mapper';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly publisher: RabbitMQOrderPublisher,
              private readonly orderRespository: IOrderRepository      
  ) {}

  async execute(orderRequestDTO: IOrderRequestDTO): Promise<IOrder> {
    const order = OrderMapper.toEntity(orderRequestDTO)
    await this.publisher.publish(order); // << se encarga de emitir el evento
    await this.orderRespository.create(order); // << se encarga de guardar el pedido en la base de datos
    return order;
  }
}