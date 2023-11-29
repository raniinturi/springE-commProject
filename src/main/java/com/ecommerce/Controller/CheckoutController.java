package com.ecommerce.Controller;

import java.util.HashSet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Service.CheckoutService;
import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponse;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
	
	private CheckoutService checkoutService;
	
	public CheckoutController(CheckoutService theCheckoutService) {
		this.checkoutService=theCheckoutService;
	}
	
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
	    if (purchase.getOrderItem() == null) {
	        purchase.setOrderItem(new HashSet<>());  // Initialize orderItem to an empty set
	    }

	  /*  // Convert and add OrderItems from OrderItemRequests
	    List<OrderItem> orderItems = ...; // Retrieve order items from the frontend
	    purchase.addOrderItems(orderItems);*/

	    // Ensure that orderItems are added correctly
	    System.out.println("Order items: " + purchase.getOrderItem());

	    // Ensure that orderItems are added correctly
	    System.out.println("Order items: " + purchase.getOrderItem());

	    PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
	    return purchaseResponse;
	}


}
