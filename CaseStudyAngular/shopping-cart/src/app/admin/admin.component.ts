import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  formData:any={};

  selectedImage: File | undefined;

  productId:any;

  constructor(private productService: ProductService) { }

  submitForm() {
    if (this.formData.productId && this.formData.productName !== undefined) {
      
      const formData = new FormData();
      formData.append('productId', this.formData.productId.toString());
      formData.append('productName', this.formData.productName);
      formData.append('price', this.formData.price.toString());
      formData.append('color', this.formData.color);
      formData.append('dimension', this.formData.dimension);
      formData.append('specification', this.formData.specification);
      formData.append('menufacturer', this.formData.menufacturer);
      formData.append('category', this.formData.category);
      
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }
      


      this.productService.addProducts(formData).subscribe(response => {
        console.log('Response:', response);
        this.resetForm();
      });
    } else {
      console.error('Form data is incomplete.');
    }
  }

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  resetForm() {
    this.formData = {};
    this.selectedImage = undefined;
  }

  removeProducts(){
    this.productService.removeProducts(this.productId).subscribe();
  }

}
