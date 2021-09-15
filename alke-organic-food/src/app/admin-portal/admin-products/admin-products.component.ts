import { Component, OnInit } from '@angular/core';
import { Product, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  successMsg: any;


  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
    
  }


  deleteProd(id:any){
    this._productService.deleteProduct(id).subscribe((res) => {
      console.log(res, 'deleteres==>');
      this.successMsg = res.message;
    })
  }

  getAllProducts(){
    this._productService.getAllProducts(12).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.log(prods);
    }, (error) => console.log(error))
  }

}
