import { HttpClient } from '@angular/common/http';
import { ProductResponseModel } from './../models/order.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];
  private server_url = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  getOneOrder(orderId: number) {
    return this._http.get<ProductResponseModel[]>(`${this.server_url}/order/${orderId}`).toPromise();
  }


}
