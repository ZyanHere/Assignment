// lib/api/cart.js
import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** GET /retail/cart/me → returns mapped items[] */
export async function fetchCart() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/cart/me');
    const items = data.data.items;
    return items.map((i) => ({
      id: i.cart_item_id,
      variantId: i.variant._id,
      name: i.variant.variant_name,
      brand: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      seller: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      vendorId: i.variant.product.vendor_store_id?._id || 'default',
      vendorName: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      price: i.unit_price,
      mrp: i.variant.price.base_price,
      image:
        i.variant.images.find((img) => img.is_primary)?.url ||
        i.variant.product.images[0]?.url,
      weight: i.variant.variant_name,
      quantity: i.quantity,
    }));
  } catch (e) {
    unwrapError(e);
  }
}

/** POST /retail/cart/me/items */
export async function addOrUpdateItem(variantId, quantity = 1) {
  try {
    await api.post('/lmd/api/v1/retail/cart/me/items', { variant_id: variantId, quantity });
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /retail/cart/me/items/:itemId */
export async function updateCartItem(itemId, quantity) {
  try {
    await api.put(`/lmd/api/v1/retail/cart/me/items/${itemId}`, { quantity });
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /retail/cart/me/items/:itemId */
export async function removeItem(itemId) {
  try {
    await api.delete(`/lmd/api/v1/retail/cart/me/items/${itemId}`);
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /retail/cart/me */
export async function clearCart() {
  try {
    await api.delete('/lmd/api/v1/retail/cart/me');
  } catch (e) {
    unwrapError(e);
  }
}
