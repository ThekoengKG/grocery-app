import { UserUpdateComponent } from './admin-portal/user-update/user-update.component';
import { UpdateComponent } from './admin-portal/update/update.component';
import { CreateComponent } from './admin-portal/create/create.component';
import { AdminUsersComponent } from './admin-portal/admin-users/admin-users.component';
import { AdminProductsComponent } from './admin-portal/admin-products/admin-products.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './admin-portal/user-create/user-create.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'order', component: OrderComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'thankyou', component: ThankyouComponent},
  { path: 'admin-products', component: AdminProductsComponent},
  { path: 'admin-users', component: AdminUsersComponent},
  { path: 'create', component: CreateComponent},
  { path: 'update', component: UpdateComponent},
  { path: 'user-create', component: UserCreateComponent},
  { path: 'user-update', component: UserUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
