import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  toCart: IProduct[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((dataFromService: IProduct[]) => {
      this.products = dataFromService;
    });
    this.service.getProduct();
    
    this.toCart = this.saveToLs('Order')

  }

  addToCart(product: IProduct) {
    this.toCart.push(product);
    localStorage.setItem('Order', JSON.stringify(this.toCart));
  }

  saveToLs(data: string) {
    return JSON.parse(localStorage.getItem(data) || '[]')
  }
}