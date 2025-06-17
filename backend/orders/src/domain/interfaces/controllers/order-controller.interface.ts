export interface IOrderController {
  create(data: { item: string; quantity: number }): Promise<any>;
}