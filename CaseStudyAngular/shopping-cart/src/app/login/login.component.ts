import { Component } from '@angular/core';
import { Authdetails } from '../authdetails';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authDetail: Authdetails = new Authdetails();
  isUserValid: any;
  roles: any;

  constructor(private productService: ProductService, private router: Router, private appObj: AppComponent){}
  ngOnInit(){}

  loginUser(){
    console.log(this.authDetail);
    this.productService.validateUser(this.authDetail).subscribe(data => {this.isUserValid = data;
      this.appObj.updateAuth(this.isUserValid);
      console.log(data);
      if(this.isUserValid){
        this.productService.generateToken(this.authDetail).subscribe(data => {this.productService.token = data.token; 
          this.roles = data.roles;
          console.log(data.token);
          console.log(data.roles);
          if(this.roles === "ADMIN"){
            this.productService.setAdminRole();
            this.router.navigate(['/admin']);
          }
          else {
            this.productService.setUserRole();
            this.router.navigate(['/home']);
          }
        });

      }
      else{
        this.authDetail= new Authdetails();
        alert("Enter correct email or password");
      }
    });
    this.router.navigate(['/home']);
  }
}
