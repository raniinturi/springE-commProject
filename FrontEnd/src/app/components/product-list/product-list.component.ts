import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
 // templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[] = []; 
  currentCategoryId: number = 1;
  searchMode:boolean = false;


  constructor(private productservice: ProductService,
    private route:ActivatedRoute,
    private cartService:CartService) { }
 
  
  ngOnInit(): void {
   
   this.route.paramMap.subscribe(()=>{
    this.listProducts();
   })
  }

  listProducts(){
  //if find the keyword in search button passed it from searchComponent
  this.searchMode = this.route.snapshot.paramMap.has('keyword');
  
  if(this.searchMode){
    this.handleSearchProducts();
  }else{
  this.handledListProduct();
  }
  }

  handleSearchProducts(){
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
    console.log("productlist-=>"+theKeyword)

    //now search for the products using keyword
    this.productservice.searchProducts(theKeyword).subscribe(
      data=>{
        this.products = data;
      }
    );
  }
 handledListProduct(){

  //check if "id" parameter is available
  const hasCategoryId: boolean=this.route.snapshot.paramMap.has('id');
  if(hasCategoryId){
    //get the "id" param string .convert string to a number using the "+" symbol
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  }
  else{
    //not category id available .. default to cateegory id 1
    this.currentCategoryId = 1;
  }

  //now get the products for the given category id
  this.productservice.getProductList(this.currentCategoryId).subscribe((data)=>{
    this.products = data;
  })

 }

 addToCart(theProduct:Product){
  console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  const theCartItems = new CartItem(theProduct);
   this.cartService.addToCart(theCartItems);
 }
}
