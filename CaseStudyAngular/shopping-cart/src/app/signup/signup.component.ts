import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Address } from '../address';
import { Authdetails } from '../authdetails';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  auth: Authdetails = new Authdetails();
  user: any = {};
  addressObj: Address = {};
  verificationCode: any;
  codeInput: any = false;
  buttonForSendingCode: any = true;
  isUserVerified: any = false;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.user.roles = "USER";
    this.user.email = this.auth.username;
    this.user.password = this.auth.password;
    this.user.address = this.addressObj;
    this.productService.register(this.user).subscribe(data => console.log(data));
    this.router.navigate(['/login']);
      // (response) => {
      //   console.log('Registration successful', response);
      //   this.router.navigate(['/login']);
      // },
      // (error) => {
      //   console.error('Registration failed', error);
      //   // Handle registration error
      // }
    // );
  }

  sendVerificationCode(){
    this.productService.sendVerificationCode(this.auth).subscribe();
    this.codeInput = true;
    this.buttonForSendingCode = false;
  }
  verifyCode(){
    console.log(this.verificationCode);
    // console.log(code);
    this.productService.verifyEmail(this.verificationCode).subscribe(data => {
      console.log(data);
      if(data){
        this.isUserVerified = data;
      }
      else{
        alert("Enter valid code");
      }
    }); 
  }
}
