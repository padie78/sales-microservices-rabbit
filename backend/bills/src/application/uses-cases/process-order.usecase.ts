import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { RabbitMQOrderConsumer } from '../../infrastructure/messaging/billing.consumer';

@Injectable()
export class ProcessOrderUseCase {
  constructor(private readonly consumer: RabbitMQOrderConsumer){}
  execute(order: Order) {
    console.log('💰 Procesando orden:', order);
  }

}
