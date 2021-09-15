import { ProductModel } from './../models/product.model';
import { OrderService } from './../services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  message: string;
  orderId: number;
  products: ProductModel[]= [];
  cartTotal: number;

  constructor(private _router: Router, private _orderService: OrderService) { 
    const navigation = this._router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: string,
      products: ProductModel[],
      orderId: number,
      total: number
    }
    this.message = state.message;
    this.products = state.products;
    this.orderId = state.orderId;
    this.cartTotal = state.total;
  }

  ngOnInit() {
  }


}
