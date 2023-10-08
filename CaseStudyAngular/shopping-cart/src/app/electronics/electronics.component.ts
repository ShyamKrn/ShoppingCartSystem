import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent {

  electronicsProducts: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getElectronicsProducts().subscribe((products) => {
      this.electronicsProducts = products;
    });
  }

  addToCart(prodId: number){
    this.productService.addToDatabase().subscribe(() => {
      this.productService.getCId().subscribe(data=>{this.productService.cId=data.customerId;
        this.productService.addToCart(prodId).subscribe(() => {
          this.router.navigate(['/cart']);
      });});
    });
    
  }

}

