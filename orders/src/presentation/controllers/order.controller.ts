import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/uses-cases/create-order.usecase';
import { IOrderController } from '../../domain/interfaces/controllers/order-controller.interface';

@Controller('orders')
export class OrderController implements IOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async create(@Body() body: { item: string; quantity: number }) {
    const order = await this.createOrderUseCase.execute(body.item, body.quantity);
    return { message: 'Order sent to billing service', order };
  }
}