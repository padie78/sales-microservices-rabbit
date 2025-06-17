import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../models/billing.model';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html'
})
export class BillingListComponent implements OnInit {
  billings: Billing[] = [];

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getBillings().subscribe(billings => {
      this.billings = billings;
    });
  }
}
