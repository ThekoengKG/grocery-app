import { Cart } from './../models/cart.model';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: Cart;

  constructor(private _cartService: CartService) { }

  ngOnInit() {
    
    this._cartService.cartData$.subscribe(data => this.cartData = data);

  }

}
