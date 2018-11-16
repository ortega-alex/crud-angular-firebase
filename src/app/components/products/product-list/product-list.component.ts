import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList : Product[];
 
  constructor(private productService : ProductService , private toastr : ToastrService) {

   }

  ngOnInit() {
    this.productService.getProduct().snapshotChanges().subscribe(items => {
      this.productList = [];
      items.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product)
      })
    })
  }

  onEdit(product : Product){
    this.productService.selectedProduct = Object.assign({} , product)
    //this.productService.selectedProduct = product
  }

  onDelete($key : string){

    this.productService.deleteProduct($key);
    this.toastr.success("Syccessfull Operation" , "Prodict Deleted");
  }

}
