import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';
  // isAuthenticated:any=false;
  isAuthenticated:any=localStorage.getItem('isAuth');
  isAdmin:any=false;
  // details:any={};
  roles:any='';

  constructor(private productService:ProductService, private router: Router){}
  ngOnInit(){
    
  }

  updateAuth(isAuth:any){
    this.isAuthenticated=isAuth;
    localStorage.setItem('isAuth',this.isAuthenticated);
    console.log("app" + this.isAuthenticated);
  }
  goToCart(){
    this.productService.getCId().subscribe(data => { this.productService.cId = data.customerId; 
                                                      this.router.navigate(["/cart"])});
  }

  logout(){
    this.productService.authDetails = {};
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  checkUser(){
      if(this.roles=='ADMIN')
      {
        this.isAdmin=true;
        this.productService.setAdminRole();
        this.router.navigate(['/admin']);
      }
      else {
        this.productService.setUserRole();
        this.router.navigate(['/home']);
      }
  }

  updateUser(isAdmin:any)
  {
    this.isAdmin=isAdmin;
    console.log(this.isAdmin);
    if(isAdmin){
      this.roles='ADMIN';
    }
  }
}

