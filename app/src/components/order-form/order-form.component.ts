import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent {
  order: Order = {
    item: 'test',
    quantity: 1
  };

  constructor(private orderService: OrderService) { }
  
  submitOrder() {
    console.log('Submitting order:');
    this.orderService.createOrder(this.order).subscribe(() => {
      this.order = { item: 'test', quantity: 1 };
    });
  }
}