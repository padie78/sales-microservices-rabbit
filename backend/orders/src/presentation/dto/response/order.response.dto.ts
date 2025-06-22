export class OrderResponseDTO {
  id: string;
  customerId: number;
  productId: number;
  quantity: number; 
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
}