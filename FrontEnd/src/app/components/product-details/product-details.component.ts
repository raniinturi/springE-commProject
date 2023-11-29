import { ProductService } from 'src/app/services/product.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private ProductService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService){}

  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
   


    //get the "id" param sring.convert string to a number using the "+"symbol
    const theProductId: number =+this.route.snapshot.paramMap.get('id')!;

    this.ProductService.getProduct(theProductId).subscribe(
      data=>{
        this.product=data;
      }
    )
  }

  addToCart(){
   console.log(`Adding to cart:${this.product.name},${this.product.unitPrice}`);
   const theCartItems = new CartItem(this.product);
   console.log("the ======>"+theCartItems)
   this.cartService.addToCart(theCartItems);
  }

}
