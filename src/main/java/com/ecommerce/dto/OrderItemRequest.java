package com.ecommerce.dto;

import java.math.BigDecimal;

public class OrderItemRequest {

	 private String imageUrl;
	    private BigDecimal unitPrice;
	    private int quantity;
	    private Long productId;
		public OrderItemRequest() {
			super();
			// TODO Auto-generated constructor stub
		}
		public OrderItemRequest(String imageUrl, BigDecimal unitPrice, int quantity, Long productId) {
			super();
			this.imageUrl = imageUrl;
			this.unitPrice = unitPrice;
			this.quantity = quantity;
			this.productId = productId;
		}
		public String getImageUrl() {
			return imageUrl;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		public BigDecimal getUnitPrice() {
			return unitPrice;
		}
		public void setUnitPrice(BigDecimal unitPrice) {
			this.unitPrice = unitPrice;
		}
		public int getQuantity() {
			return quantity;
		}
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}
		public Long getProductId() {
			return productId;
		}
		public void setProductId(Long productId) {
			this.productId = productId;
		}
	    
	    
}
