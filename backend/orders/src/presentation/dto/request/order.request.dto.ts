import { IsInt, IsPositive, Min } from 'class-validator';

export class OrderRequestDTO {
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