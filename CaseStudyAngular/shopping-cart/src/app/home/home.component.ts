import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: any[] = []; 

  constructor(private _productService: ProductService, private router: Router) {}
  

  ngOnInit() {
    this._productService.getProducts().subscribe(data => {
      this.products = data;
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

  // ngOnDestroy() {
  //   // Don't forget to unsubscribe to prevent memory leaks
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
}



// import { Component } from '@angular/core';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {

//   public products=[];
//   constructor(private _productService:ProductService){}

//   ngOnInit(){
//     this.products=this._productService.getProducts()
//                       .subscribe(data=>this.products=data);
//   }

// }
