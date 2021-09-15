import { CartService } from './../services/cart.service';
import { ServerResponse } from './../models/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private _productService: ProductService, private _router: Router, private _cartService: CartService) { }

  ngOnInit() {
    this._productService.getAllProducts(12).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.log(prods);
    })
  }


  productDetails(prod_id: number){
    this._router.navigate(['/product', prod_id])

  }


  addToCart(prod_id: number){
    this._cartService.AddProductToCart(prod_id);

  }

}
