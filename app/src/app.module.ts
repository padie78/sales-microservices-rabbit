import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { BillingListComponent } from './components/billing-list/billing-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    BillingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
