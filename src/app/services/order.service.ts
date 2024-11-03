import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://your-backend-api.com/orders'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Method to create an order
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
}
