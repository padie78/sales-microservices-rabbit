import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private baseUrl = 'http://localhost:3003/billings'; // API Gateway

  constructor(private http: HttpClient) {}

  getBillings() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
