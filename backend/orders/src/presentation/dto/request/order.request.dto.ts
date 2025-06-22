import { IsInt, IsPositive, Min } from 'class-validator';
import { IOrderRequestDTO } from '../../../domain/interfaces/dto/request/order.request.dto.interface';

export class OrderRequestDTO implements IOrderRequestDTO {
  @IsInt()
  @Min(1)
  customerId: number;

  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number; 

  @IsPositive()
  unitPrice: number;

  @IsPositive()
  subtotal: number; 
}