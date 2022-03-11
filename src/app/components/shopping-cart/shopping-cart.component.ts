import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product.service';
import { IOrderRows } from 'src/app/models/IOrderRows';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: IProduct[] = [];
  users: User[] = [];
  formToAdmin: User[] = [];
  orders: Order[] = [];
  apiToAdmin: Order[] = [];
  
  orderRows: IOrderRows[] = [];

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cellphone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    paymentMethod: new FormControl('', [Validators.required])
  });

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('Order') || '[]')

    //Hämtar "Orders API"
    this.service.orders$.subscribe((dataFromService: Order[]) => {
      this.orders = dataFromService;
    });
    this.service.getApi();

    this.formToAdmin = this.saveToLs('Admin')
  }

  removeProduct(i: number) {
    this.products.splice(i, 1)
    localStorage.setItem('Order', JSON.stringify(this.products));
  }

  handleApi(users: User) {
    let price: number = 0;
    let newOrder = new Order(users, price, this.orderRows);
    this.service.postToApi(newOrder)
    this.userForm.reset();
  }

  onSubmit() {
    let addForm = new User(
      this.userForm.value.firstname,
      this.userForm.value.lastname,
      this.userForm.value.address,
      this.userForm.value.city,
      this.userForm.value.zipCode,
      this.userForm.value.cellphone,
      this.userForm.value.email,
      this.userForm.value.paymentMethod)

    this.handleApi(addForm)

    console.log(addForm);

    this.formToAdmin.push(addForm);
    localStorage.setItem('Admin', JSON.stringify(this.formToAdmin));
  }

  saveToLs(data: string) {
    return JSON.parse(localStorage.getItem(data) || '[]')
  }

}