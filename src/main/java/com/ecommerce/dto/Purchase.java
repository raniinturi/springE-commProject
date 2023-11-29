package com.ecommerce.dto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ecommerce.entity.Address;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;

public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItem;
    
    

    public Purchase() {
        this.orderItem = new HashSet<>(); // Initialize orderItem to an empty set
    }

    public Purchase(Customer customer, Address shippingAddress, Address billingAddress, Order order,
            Set<OrderItem> orderItem) {
        super();
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.order = order;
        this.orderItem = orderItem;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Set<OrderItem> getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(Set<OrderItem> orderItem) {
        this.orderItem = orderItem;
    }

    public void addOrderItems(List<OrderItemRequest> orderItemRequests) {
        for (OrderItemRequest orderItemRequest : orderItemRequests) {
            OrderItem orderItem = convertToOrderItem(orderItemRequest);
            this.orderItem.add(orderItem);
        }
    }
    
    private OrderItem convertToOrderItem(OrderItemRequest orderItemRequest) {
        OrderItem orderItem = new OrderItem();
        orderItem.setImageUrl(orderItemRequest.getImageUrl());
        orderItem.setUnitPrice(orderItemRequest.getUnitPrice());
        orderItem.setQuantity(orderItemRequest.getQuantity());
        orderItem.setProductId(orderItemRequest.getProductId());
        return orderItem;
    }

}
