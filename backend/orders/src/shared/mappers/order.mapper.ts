import { OrderRequestDTO } from '../../presentation/dto/request/order.request.dto';
import { OrderResponseDTO } from '../../presentation/dto/response/order.response.dto';
import { IOrder } from '../../domain/interfaces/entities/order.entity.interface';
import { Order } from '../../domain/entities/order.entity';

export class OrderMapper {
  
  static toResponse(order: IOrder): OrderResponseDTO {
    return {
      id: '11',
      customerId: order.customerId,
      productId: order.productId,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      subtotal: order.subtotal,
      createdAt: new Date()
    };
  }

  static toEntity(orderRequestDTO: OrderRequestDTO): IOrder {
      return new Order(
                orderRequestDTO.customerId,
                orderRequestDTO.productId,
                orderRequestDTO.quantity,
                orderRequestDTO.unitPrice,
                orderRequestDTO.subtotal
              );
  }
}