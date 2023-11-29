package com.ecommerce.dto;

public class PurchaseResponse { // use this class to send back as java object

	private String orderTrackingNumber;

	public PurchaseResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PurchaseResponse(String orderTrackingNumber) {
		super();
		this.orderTrackingNumber = orderTrackingNumber;
	}

	public String getOrderTrackingNumber() {
		return orderTrackingNumber;
	}

	public void setOrderTrackingNumber(String orderTrackingNumber) {
		this.orderTrackingNumber = orderTrackingNumber;
	}

}
