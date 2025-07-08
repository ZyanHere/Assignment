// lib/api/cart.js
import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** GET /me → returns mapped items[] */
export async function fetchCart() {
  try {
    const { data } = await api.get('/');
    const items = data.data.items;
    return items.map((i) => ({
      id: i.cart_item_id,
      variantId: i.variant._id,
      name: i.variant.product.name,
      brand: 'No Brand',
      seller: i.variant.product.vendor_store_id.store_name,
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

/** POST /me/items */
export async function addOrUpdateItem(variantId, quantity = 1) {
  try {
    await api.post('/items', { variant_id: variantId, quantity });
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /me/items/:itemId */
export async function updateCartItem(itemId, quantity) {
  try {
    await api.put(`/items/${itemId}`, { quantity });
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /me/items/:itemId */
export async function removeItem(itemId) {
  try {
    await api.delete(`/items/${itemId}`);
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /me */
export async function clearCart() {
  try {
    await api.delete('/');
  } catch (e) {
    unwrapError(e);
  }
}
