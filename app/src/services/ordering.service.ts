import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderingService {
  private baseUrl = 'http://localhost:3003/orders'; // API Gateway

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    console.log('Creating order:', order);
    return this.http.post(this.baseUrl, order);
  }
}
