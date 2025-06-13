import { IOrder } from "../interfaces/entities/order.interface";

export class Order implements IOrder {
  constructor(
    public readonly id: string,
    public readonly item: string,
    public readonly quantity: number,
  ) {}
}
