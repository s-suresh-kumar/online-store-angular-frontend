import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  constructor(private productService: ProductService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    
    // get the "id" parm string. convert string to a number using the "+" symbol.
    let  theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log("!!!!theProductId = ", theProductId);
    this.productService.getProduct(theProductId).subscribe(
      data => {
        console.log("!!!! data = ", data);
        this.product = data;
        console.log("!!!! this.product = ", this.product);
      });
  }

}
