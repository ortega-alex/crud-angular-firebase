import { Component, OnInit } from '@angular/core';

//services
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService , private toast : ToastrService) {

  }

  ngOnInit() {
    this.productService.getProduct()
    this.resetForm()
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      this.productService.inserProduct(productForm.value);
      this.toast.success("Successfull operation" , "insert product");
    } else {
      this.productService.updateProduct(productForm.value);
      this.toast.success("Successfull operation" , "Edit product");
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product
    }
  }

}
