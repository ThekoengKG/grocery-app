import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: Cart;
  cartTotal: number;
  subTotal: number;


  constructor(public _cartService: CartService) { }

  ngOnInit() {
    this._cartService.cartData$.subscribe((data: Cart) => this.cartData = data);
    this._cartService.cartTotal$.subscribe((total: number) => this.cartTotal = total );

  }

  changeQuantity(index: number, increase: boolean){
    this._cartService.UpdateCartData(index, increase);
  }

}
