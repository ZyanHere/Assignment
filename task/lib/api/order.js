import { api } from './axios';

// Create order from cart
export const createOrderFromCart = async (orderData) => {
  try {
    const response = await api.post('/lmd/api/v1/retail/orders/create-from-cart', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order from cart:', error);
    throw error;
  }
};

// create order from single item
export const createOrderFromSingleItem = async (orderData) => {
  try {
    const response = await api.post('/lmd/api/v1/retail/orders/single-item', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order from cart:', error);
    throw error;
  }
}

// Get order details
export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/lmd/api/v1/retail/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// Get customer orders
export const getCustomerOrders = async (params = {}) => {
  try {
    const response = await api.get('/lmd/api/v1/retail/orders/customer', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId, reason) => {
  try {
    const response = await api.post(`/lmd/api/v1/retail/orders/${orderId}/cancel`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
}; 