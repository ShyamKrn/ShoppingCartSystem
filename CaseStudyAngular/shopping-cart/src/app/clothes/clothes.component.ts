import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent {

  
    clothProduct: any[] = [];
  
    constructor(private _productService: ProductService,private router: Router) {}
  
    ngOnInit(): void {
      this._productService.getClothProducts().subscribe((products) => {
        this.clothProduct = products;
      });
    }
    addToCart(prodId: number){
      this._productService.addToDatabase().subscribe(() => {
        this._productService.getCId().subscribe(data=>{this._productService.cId=data.customerId;
          this._productService.addToCart(prodId).subscribe(() => {
            this.router.navigate(['/cart']);
        });});
      });
      // this._productService.addToCart(prodId).subscribe();
      // this.router.navigate(['/cart'])
    }

}
