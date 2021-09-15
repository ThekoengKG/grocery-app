import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {Product, ServerResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   server_url = 'http://localhost:3000/api';


  constructor(private _http: HttpClient, private _router: Router) { }


  getAllProducts(numProds: Number = 10): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(this.server_url + '/products', {
      params: {
        limit: numProds.toString()
      }
    });
  }


  getOneProduct(prod_id: number): Observable<Product> {
    return this._http.get<Product>(this.server_url + '/products/' + prod_id);
  }
  
  getProductsFromCategory(categoryName: String): Observable<Product[]> {
    return this._http.get<Product[]>(this.server_url + '/products/category/' + categoryName);
  }

  //Create product
  createData(data:any):Observable<any>{
    return this._http.post(this.server_url + '/products/add', data);

  }

  //Delete single product
  deleteProduct(id:any):Observable<any>{
    let prodId = id;
    return this._http.delete(this.server_url + '/products/delete/' + prodId);
    
  }
  
}
