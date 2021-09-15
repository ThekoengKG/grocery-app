import { Product } from './../models/product.model';
import { CartService } from './../services/cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number;
  product: Product = new Product;

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _cartService: CartService) { }

  ngOnInit() {
    //    this.id = this._activatedRoute.snapshot.paramMap.get(id);
    //   this._productService.getOneProduct(this.id).subscribe(result => {
    //   console.log(result);
    //   this.product= result;
    // }, error => { console.log(error) });

  }

}
