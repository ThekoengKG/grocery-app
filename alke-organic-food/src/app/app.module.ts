import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminProductsComponent } from './admin-portal/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-portal/admin-users/admin-users.component';
import { CreateComponent } from './admin-portal/create/create.component';
import { UpdateComponent } from './admin-portal/update/update.component';
import { UserCreateComponent } from './admin-portal/user-create/user-create.component';
import { UserUpdateComponent } from './admin-portal/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    ThankyouComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    CreateComponent,
    UpdateComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
