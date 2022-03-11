import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  orders: Order[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.orders$.subscribe((dataFromService: Order[]) => {
      this.orders = dataFromService;
    });
    this.service.getApi();

    this.users = JSON.parse(localStorage.getItem('Admin') || '[]')
  }

  deleteApiData() {
    this.service.deleteApi(); 
  }
}
