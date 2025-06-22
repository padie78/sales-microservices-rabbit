import { Component } from '@angular/core';
import { OrderingService } from '../../../services/ordering.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent {
  order: Order = {
    item: 'test',
    quantity: 1
  };

  constructor(private orderingService: OrderingService) { }
  
  onSubmit() {
    console.log('Submitting order:');
    this.orderingService.createOrder(this.order).subscribe(() => {
      this.order = { item: 'test', quantity: 1 };
    });
  }
}