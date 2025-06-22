import { CreateOrderCommand } from '../../application/commands/create-order.command';
import { OrderRequestDTO } from '../../presentation/dto/request/order.request.dto';
import { OrderResponseDTO } from '../../presentation/dto/response/order.response.dto';
import { Order } from '../../domain/entities/order.entity';

export class OrderMapper {
  static toCommand(dto: OrderRequestDTO): CreateOrderCommand {
    return new CreateOrderCommand(               dto.customerId,
                dto.productId,
                dto.quantity,
                dto.unitPrice,
                dto.subtotal
 );
  }

  static toResponse(order: Order): OrderResponseDTO {
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

  static toEntity(command: CreateOrderCommand): Order {
      return new Order(
                command.customerId,
                command.productId,
                command.quantity,
                command.unitPrice,
                command.subtotal
              );
  }
}