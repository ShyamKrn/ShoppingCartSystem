import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  details: any;

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productService.getCId().subscribe(data=>{this.productService.cId=data.customerId;
      this.productService.getCustomerDetails().subscribe((data: any) => {
        const dataObj = JSON.parse(data);
        this.details = dataObj;
      })});
    
  }

}
