import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Router } from '@angular/router';

declare var Razorpay:any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  customerId: string = ""; 
  products: any[] = [
  ];
  totalPrice: any = 0.00;

  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(){
    
    this.productService.displayProductInCart().subscribe(data => {this.products = data
      this.productService.setConfirmationProducts(this.products)});
  }
  // addToCart() {
  //   // this.productService.addToCart(this.customerId, product.id).subscribe(data=>console.log("Product added"))
  // }
  calculateTotal(){
    this.productService.getCartTotal().subscribe(data => this.totalPrice = data.totalPrice);
  }
  removeFromCart(prodId: number){
    this.productService.getCId().subscribe(data=>{this.productService.cId=data.customerId;
      this.productService.removeProductFromCart(prodId).subscribe(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart']);
        });
        // this.router.navigate(['/cart']);
    });});
    // this._productService.addToCart(prodId).subscribe();
    // this.router.navigate(['/cart'])
  }

  transactionDisplay(){
    this.productService.createTransaction(this.totalPrice).subscribe(
      (response) => {
        console.log(response);
        this.openTransactionModel(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openTransactionModel(response: any){
    var options = {
      order_id: response.order_id,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Shyam',
      description: 'Payment',
      image: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      handler: (response: any) => {
        this.processResponse(response);
      },
      prefill: {
        name: 'Shyam Kr',
        email: 'shyam@gmail.com',
        contact: '987878656'
      },
      notes:{
        address: 'GHHASKN'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any){
    console.log(resp);
    if(resp.razorpay_payment_id){
      this.productService.addToHistory().subscribe();
      this.router.navigate(['/confirmation']);
    }
  }




 }


