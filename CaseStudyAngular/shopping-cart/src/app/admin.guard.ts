import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(): boolean {
    if (this.productService.isUserAdmin()) {
      return true; // Allow access for admin users
    } else {
      this.router.navigate(['/home']); // Redirect to the home page for non-admin users
      return false;
    }
  }
}