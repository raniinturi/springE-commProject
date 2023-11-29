import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  cartItems: CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;

  
  constructor(private cartservice:CartService){}

  ngOnInit(){
    this.listCartDetails();
     // Subscribe to the totalPrice subject
  this.cartservice.totalPrice.subscribe(
    data => {
      // Update the totalPrice in your component
      this.totalPrice = data;
      this.totalQuantity = data;
    }
  );
  }
  listCartDetails() {
    
    //get a handle to the cart items
    this.cartItems = this.cartservice.cartItems;


    //subscibe to the cart totalPrice
    this.cartservice.totalPrice.subscribe(
      data=>this.totalPrice=data
    );


    //subscribe to the cart totalQuantity
    this.cartservice.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );


    //comute cart total price and quantity
    this.cartservice.computerTotals();
  }

  increment(theCartItem:CartItem){
    theCartItem.quantity++;
  this.cartservice.computerTotals();
  }
  decrement(cart: CartItem) {
    this.cartservice.decrementQuantity(cart);
  }
  

 

}
