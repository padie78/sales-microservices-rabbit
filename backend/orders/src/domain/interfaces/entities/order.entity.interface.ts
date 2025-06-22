
export interface IOrder {
  readonly customerId: number;
  readonly productId: number;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly subtotal: number;
}