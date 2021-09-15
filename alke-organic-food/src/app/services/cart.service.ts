import { Product } from './../models/product.model';
import { CartPublicModel,Cart } from './../models/cart.model';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import { OrderResponse } from '../models/order.model';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private server_url = 'http://localhost:3000/api';

  private cartDataClient: CartPublicModel = {
    prodData: [{inCart: 0, prod_id: 0}],
    total: 0};

    private cartDataServer: Cart = {
      total: 0,
      data: [{
        product: undefined,
        itemsInCart: 0
      }],
    };

    //Storing infomation in local storage
    cartTotal$ = new BehaviorSubject<Number>(0);
    cartData$ = new BehaviorSubject<Cart>(this.cartDataServer);

  constructor(private _http: HttpClient, private _prodService: ProductService, private _orderService: OrderService, private _router: Router, private _spinner: NgxSpinnerService, private _toast: ToastrService) 
  { 
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);
    //Getting stored info from the local storage
    let info: CartPublicModel = JSON.parse(localStorage.getItem('cart'));
    
    if (info !== null && info !== undefined && info.prodData[0].inCart !== 0) {
      this.cartDataClient = info;
      
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this._prodService.getOneProduct(p.prod_id).subscribe((actualProdInfo: Product) => {
          if (this.cartDataServer.data[0].itemsInCart === 0) {
            this.cartDataServer.data[0].itemsInCart = p.inCart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              itemsInCart: p.inCart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer});
        });
      });
    }



   
  }

  AddProductToCart(prod_id: number, quantity?: number){
         
        this._prodService.getOneProduct(prod_id).subscribe(prod =>{
            // If the cart is empty
            if (this.cartDataServer.data[0].product === undefined) {
              this.cartDataServer.data[0].product = prod;
              this.cartDataServer.data[0].itemsInCart = quantity !== undefined ? quantity : 1;
              this.CalculateTotal();
              this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].itemsInCart;
              this.cartDataClient.prodData[0].prod_id = prod.prod_id;
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              this.cartData$.next({...this.cartDataServer});
              this._toast.success(`${prod.name} added to the cart.`, "Product Added", {
                timeOut: 1500,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              })
            } 
            else {
              let index = this.cartDataServer.data.findIndex(p => p.product.prod_id === prod.prod_id);
      
              // If selected product exists in cart array
              if (index !== -1) {
      
                if (quantity !== undefined && quantity <= prod.quantity) {
                  
                  this.cartDataServer.data[index].itemsInCart = this.cartDataServer.data[index].itemsInCart < prod.quantity ? quantity : prod.quantity;
                } else {
                  this.cartDataServer.data[index].itemsInCart < prod.quantity ? this.cartDataServer.data[index].itemsInCart++ : prod.quantity;
                }
    
                this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].itemsInCart;
                this._toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
                  timeOut: 1500,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                })
              }
              //If selected product is not in cart array
              else {
                this.cartDataServer.data.push({
                  product: prod,
                  itemsInCart: 1
                });
                this.cartDataClient.prodData.push({
                  inCart: 1,
                  prod_id: prod.prod_id
                });
                this._toast.success(`${prod.name} added to the cart.`, "Product Added", {
                  timeOut: 1500,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                })
              }
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              this.cartData$.next({...this.cartDataServer});
            }  // END of ELSE
          });
  }

  UpdateCartData(index: number, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    
    if (increase) {
      data.itemsInCart < data.product.quantity ? data.itemsInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].inCart = data.itemsInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({...this.cartDataServer});
    } else {
    
      data.itemsInCart--;

      if (data.itemsInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartData$.next({...this.cartDataServer});
      } else {
        
        this.cartData$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].inCart = data.itemsInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }

  DeleteProductFromCart(index: number){

      if (window.confirm('Are you sure you want to delete the item?')) {
          this.cartDataServer.data.splice(index, 1);
          this.cartDataClient.prodData.splice(index, 1);
          this.CalculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;

          if (this.cartDataClient.total === 0) {
            this.cartDataClient = { total: 0, prodData: [{inCart: 0, prod_id: 0}]};
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }

          if (this.cartDataServer.total === 0) {
            this.cartDataServer = {
              data: [{
                product: undefined,
                itemsInCart: 0
              }],
              total: 0
            };
            this.cartData$.next({...this.cartDataServer});
          } else {
            this.cartData$.next({...this.cartDataServer});
          }
        }
        // If the user doesn't want to delete the product, hits the CANCEL button
        else {
          return;
        }
  }


  private CalculateTotal(){
    let _total = 0;
    this.cartDataServer.data.forEach(p => {
      const {itemsInCart} = p;
      const {price} = p.product;
      
      _total += itemsInCart * price;
    });
    this.cartDataServer.total = _total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  CheckoutFromCart(userId: number) {

    this._http.post(`${this.server_url}/order/payment`, null).subscribe((res: { success: Boolean }) => {
      console.clear();

      if (res.success) {

        this.resetServerData();
        this._http.post(`${this.server_url}/order/newOrder`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderResponse) => {
          this._orderService.getOneOrder(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this._spinner.hide().then();
              this._router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = {total: 0, prodData: [{inCart: 0, prod_id: 0}] };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });
        })
      } else {
        this._spinner.hide().then();
        this._router.navigateByUrl('/checkout').then();
        this._toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    })
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [{
        product: undefined,
        itemsInCart: 0
      }],
    };
    this.cartData$.next({...this.cartDataServer});
  }

  calculateSubTotal(index: number){
    let subTotal = 0;

    const p = this.cartDataServer.data[index];

    subTotal = p.product.price * p.itemsInCart;

    return subTotal;
  }


  
}
