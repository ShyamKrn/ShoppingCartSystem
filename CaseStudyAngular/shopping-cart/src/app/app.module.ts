import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClothesComponent } from './clothes/clothes.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ClothesComponent,
    ElectronicsComponent,
    FurnitureComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AboutusComponent,
    HomeComponent,
    CartComponent,
    AccountComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
