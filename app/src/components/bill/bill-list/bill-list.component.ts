import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../../services/billing.service';
import { Bill } from '../../../models/bill.model';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html'
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getBillings().subscribe(bills => {
      this.bills = bills;
    });
  }
}
