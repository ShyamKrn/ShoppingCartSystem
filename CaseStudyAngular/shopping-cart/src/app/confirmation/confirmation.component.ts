import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  authDetail: any; 
  products:IProduct[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log(this.products);
    this.authDetail = this.productService.getAuthDetail();
    this.products=this.productService.getConfirmationProducts();
  }
}