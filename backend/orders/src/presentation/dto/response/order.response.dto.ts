import { IOrderResponseDTO } from "../../../domain/interfaces/dto/response/order.response.dto.interface";

export class OrderResponseDTO implements IOrderResponseDTO {
  id: string;
  customerId: number;
  productId: number;
  quantity: number; 
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
}