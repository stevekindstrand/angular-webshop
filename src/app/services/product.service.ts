import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { IProduct } from '../models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private orders = new Subject<Order[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) { }

  //Hämtar "Products API"
  getProduct() {
    this.http.get<IProduct[]>(environment.productUrl).subscribe((data) => {
      this.products.next(data);
    });
  }
  
  //Skickar "Orders API"
  postToApi(orders: Order) {
    return this.http.post<Order[]>(environment.orderUrl, orders).subscribe((data) => {
      console.log(data);
    });
  }

  //Hämtar "Orders API"
  getApi() {
    this.http.get<Order[]>(environment.orderUrl).subscribe((data) => {
      this.orders.next(data);
    });
  }

  deleteApi() {
    return this.http.delete<Order[]>(environment.orderUrl).subscribe((data) => {
      console.log(data);
    });
  }
  
}