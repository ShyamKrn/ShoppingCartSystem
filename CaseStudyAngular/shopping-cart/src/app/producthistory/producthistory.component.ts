import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producthistory',
  templateUrl: './producthistory.component.html',
  styleUrls: ['./producthistory.component.css']
})
export class ProducthistoryComponent {

  products: any[] = [
  ];
  purchaseDate: Date|null = null; 
  constructor(private productService: ProductService,private router:Router) { }

 ngOnInit(){
  this.productService.getProductFromHistory().subscribe(data=>{
    this.products=data;
})

  this.productService.getPurchaseDate().subscribe(data=>{this.purchaseDate=data;})
 } 

  addProductsToPHistory(){
    this.productService.addToHistory().subscribe();
  }
}
