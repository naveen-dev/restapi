import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private clientApiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Array<Order>> {
    const mapUsers = (users: Array<Order>) =>
      users.map((user: Order) =>
        new Order(user));
    return this.http
      .get<Array<Order>>(`${this.clientApiBaseUrl}/orders`)
      .pipe(map(mapUsers));
  }
 
  public addNewOrder(order: Order) {
    return this.http
        .post(`${this.clientApiBaseUrl}/orders`,order);
  }

public deleteOrderById(id: number){
    return this.http.delete(`${this.clientApiBaseUrl}/orders/`+id);
  }

public editOrderById(order: Order) {
  return this.http.put(`${this.clientApiBaseUrl}/orders/`+order.id,order);
  }
}
