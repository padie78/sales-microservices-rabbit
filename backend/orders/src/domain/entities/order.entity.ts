import { IOrder } from "../interfaces/entities/order.entity.interface";

export class Order implements IOrder {
  constructor(
    public readonly customerId: number,
    public readonly productId: number,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly subtotal: number // quantity * unit price
  ) {}
}

