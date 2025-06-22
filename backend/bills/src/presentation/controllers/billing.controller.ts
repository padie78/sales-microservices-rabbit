import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProcessOrderUseCase } from 'src/application/uses-cases/process-order.usecase';
import { Order } from 'src/domain/entities/order.entity';

@Controller('billing')
export class BillingController {
  constructor(private readonly processOrder: ProcessOrderUseCase) {}

  @Get()
  getStatus() {
    return { status: 'Billing service activo' };
  }

  @MessagePattern('create_order')
  handleCreateOrder(@Payload() order: Order) {
    console.log('handleCreateOrder');
    this.processOrder.execute(order);
  }
}