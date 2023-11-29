import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {

  totalPrice:number=0.00;
  totalQuantity:number=0;

   constructor(private cartService:CartService){}

   ngOnInit(){
    this.updateCartStatus();
   }
  updateCartStatus() {

    //subscibe to carrt totalprice
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
    //subscibe to carrt totalQuantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
    }


}
