import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Authdetails } from '../authdetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  isUserVerified: any = false;
  verificationCode: any;
  codeInput: any = false;
  buttonForSendingCode: any = true;
  username:string='';
  password:string='';
  auth: Authdetails = new Authdetails();

  constructor(private productService:ProductService,private router:Router){

  }

   onSubmit() {
    this.auth.username=this.username;
    this.auth.password=this.password;
    console.log(this.auth.username);
     this.productService.updateUserInfo(this.auth).subscribe(data => console.log(data));
     this.router.navigate(['/login']);
   }

  sendVerificationCode(){
    this.productService.sendVerificationCodeForPasswordReset(this.username).subscribe();
    this.codeInput = true;
    this.buttonForSendingCode = false;
  }
  verifyCode(){
    console.log(this.verificationCode);
    // console.log(code);
    this.productService.verifyEmailForPasswordRest(this.verificationCode).subscribe(data => {
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