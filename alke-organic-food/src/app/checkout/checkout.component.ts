import { NgxSpinnerService } from 'ngx-spinner';
import { Cart } from './../models/cart.model';
import { Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData: Cart;
  cartTotal: number;
  subTotal: number;

  constructor(private _spinner: NgxSpinnerService, private _cartService: CartService, private _orderService: OrderService, private _router: Router) { }

  ngOnInit() {
    this._cartService.cartData$.subscribe((data: Cart) => this.cartData = data);
    this._cartService.cartTotal$.subscribe((total: number) => this.cartTotal = total );

  }

  onCheckOut(){
    this._spinner.show().then(p => {
      this._cartService.CheckoutFromCart(2);

    })
  }

}
