import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    
  cartItems: CartItem[] = [];

  //  subject is a subclass pf observable we can use subject to publish events in our code 
  //the event will be sent to all of the subscibers
totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);



  constructor() { }

  ngOnInit(){
    
  }

  addToCart(theCartItem: CartItem) {
    // Check if we already have the item in our cart
     let existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);

     // If we found it, update the quantity
     if (existingCartItem) {
         existingCartItem.quantity += theCartItem.quantity;
     } else {
         // If not found, add the new item to the cart
         this.cartItems.push(theCartItem);
     }


    //compute cart total price and toatal quantityty
    this.computerTotals();
    

     }
  computerTotals() {
   let totalPriceValue:number=0;
   let totalQuantityValue:number=0
   
   for(let currentCartItem of this.cartItems){
    totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
    totalQuantityValue += currentCartItem.quantity;
   }

   //publish the new values .. all subscibers will receive the new data
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);//next() publish/send event

   //log cart data just for to check
   this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('contents of the cart');
    for(let tempCartItems of this.cartItems){
      const subTotalPrice = tempCartItems.quantity * tempCartItems.unitPrice;
      console.log(`name:${tempCartItems.name},quantity=${tempCartItems.quantity},unitPrice=${tempCartItems.unitPrice},subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totprice:${totalPriceValue.toFixed(2)},totquantity:${totalQuantityValue}`);
    console.log('------')
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity == 0){

      this.remove(theCartItem);
    }else{
      this.computerTotals();
    }

  }
 // Add a remove method to remove an item from the cart
remove(theCartItem: CartItem) {
  const itemIndex = this.cartItems.findIndex(item => item.id === theCartItem.id);
  if (itemIndex !== -1) {
    // Use splice to remove the item at the found index
    this.cartItems.splice(itemIndex, 1);
    this.computerTotals(); // Recalculate totals after removing the item
  }
     

    }
  }
   


    



  

