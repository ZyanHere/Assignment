// lib/api/cart.js
import axios from "axios";

const BASE_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/cart/me";

function unwrapError(e) {
  if (e.response?.data?.error) throw new Error(e.response.data.error);
  throw e;
}

/** GET /me */
export async function fetchCart(token) {
  try {
    const { data } = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { cart, items } = data.data;

    const mappedItems = items.map((i) => ({
      id: i.cart_item_id,
      variantId: i.variant._id,
      name: i.variant.product.name,
      brand: i.variant.product.vendor_store_id,
      seller: i.variant.product.vendor_store_id,
      price: i.unit_price,
      mrp: i.variant.price.base_price,
      image:
        i.variant.images.find((img) => img.is_primary)?.url ||
        i.variant.product.images[0]?.url,
      weight: i.variant.variant_name,
      quantity: i.quantity,
    }));

    return { cart, items: mappedItems };
  } catch (e) {
    unwrapError(e);
  }
}

/** POST /me/items */
export async function addToCart(token, variantId, quantity) {
  try {
    await axios.post(
      `${BASE_URL}/items`,
      { variant_id: variantId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /me/items/:itemId */
export async function updateCartItem(token, itemId, quantity) {
  try {
    await axios.put(
      `${BASE_URL}/items/${itemId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /me/items/:itemId */
export async function removeFromCart(token, itemId) {
  try {
    await axios.delete(`${BASE_URL}/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /me */
export async function clearCart(token) {
  try {
    await axios.delete(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    unwrapError(e);
  }
}
