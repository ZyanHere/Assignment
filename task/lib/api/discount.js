// lib/api/discount.js
import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/**
 * Validate a discount code
 * GET /retail/discounts/validate
 */
export async function validateDiscountCode(code, cartDetails = {}) {
  try {
    const params = new URLSearchParams({
      code: code.toUpperCase(),
      cart: JSON.stringify(cartDetails)
    });
    
    const { data } = await api.get(`/lmd/api/v1/retail/discounts/validate?${params}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/**
 * Apply discount to cart
 * POST /retail/cart/me/discount
 */
export async function applyDiscountToCart(code, cartId) {
  try {
    const { data } = await api.post('/lmd/api/v1/retail/cart/me/discount', {
      code: code.toUpperCase(),
      cart_id: cartId
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/**
 * Remove discount from cart
 * DELETE /retail/cart/me/discount
 */
export async function removeDiscountFromCart(cartId) {
  try {
    const { data } = await api.delete('/lmd/api/v1/retail/cart/me/discount', {
      data: { cart_id: cartId }
    });
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/**
 * Get available discount codes
 * GET /retail/discounts
 */
export async function getAvailableDiscounts() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/discounts');
    return data.data.discounts;
  } catch (e) {
    unwrapError(e);
  }
}

/**
 * Get discount categories
 * GET /retail/discounts/categories
 */
export async function getDiscountCategories() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/discounts/categories');
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/**
 * Get discount subcategories
 * GET /retail/discounts/subcategories
 */
export async function getDiscountSubcategories(categoryId = null) {
  try {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    const { data } = await api.get(`/lmd/api/v1/retail/discounts/subcategories${params}`);
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
} 