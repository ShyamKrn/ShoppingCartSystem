import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClothesComponent } from './clothes/clothes.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { isLoggedInGuard } from './is-logged-in.guard';
import { ProducthistoryComponent } from './producthistory/producthistory.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'clothes', component: ClothesComponent},
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'furniture', component: FurnitureComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'cart', component: CartComponent,canActivate: [isLoggedInGuard],},
  {path: 'account', component: AccountComponent,canActivate: [isLoggedInGuard],},
  {path: 'confirmation', component: ConfirmationComponent,canActivate: [isLoggedInGuard],},
  {path: 'producthistory', component: ProducthistoryComponent,canActivate: [isLoggedInGuard],},
  {path: 'admin', component: AdminComponent,canActivate: [AdminGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
