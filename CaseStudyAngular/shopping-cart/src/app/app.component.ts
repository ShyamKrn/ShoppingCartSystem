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
  isAuthenticated:any=false;
  // isAdmin:any=false;
  // details:any={};

  constructor(private productService:ProductService, private router: Router){}
  ngOnInit(){
    
  }

  updateAuth(isAuth:any){
    this.isAuthenticated=isAuth;
    console.log("app" + this.isAuthenticated);
  }
  goToCart(){
    this.productService.getCId().subscribe(data => { this.productService.cId = data.customerId; 
                                                      this.router.navigate(["/cart"])});
  }

  logout(){
    this.productService.authDetails = {};
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

  // checkUser(){
  //   this.productService.getCId().subscribe(data=>{this.productService.cId=data.customerId;
  //     this.productService.getCustomerDetails().subscribe((data: any) => {
  //       const dataObj = JSON.parse(data);
  //       this.details = dataObj;
  //     })});
  //     if(this.details.roles=='ADMIN')
  //     {
  //       this.isAdmin=true;
  //       this.productService.setAdminRole();
  //       this.router.navigate(['/admin']);
  //     }
  //     else {
  //       this.productService.setUserRole();
  //       this.router.navigate(['/home']);
  //     }
  // }
}

