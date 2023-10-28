// import { CanActivateFn } from '@angular/router';

// export const isLoggedInGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class isLoggedInGuard implements CanActivate {
  constructor(private productService:ProductService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const check=this.productService.isLoggedIn();

      if(!check){
          this.router.navigate(["/login"]);
          
      }
    return true;
  }
}