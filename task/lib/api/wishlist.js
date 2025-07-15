import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** GET /retail/wishlist → returns wishlist items[] */
export async function fetchWishlist() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/wishlist');
    return data.data;
  } catch (e) {
    unwrapError(e);
  }
}

/** POST /retail/wishlist → add product to wishlist */
export async function addToWishlist(productId) {
  try {
    await api.post('/lmd/api/v1/retail/wishlist', { product_id: productId });
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /retail/wishlist/:productId → remove product from wishlist */
export async function removeFromWishlist(productId) {
  try {
    await api.delete(`/lmd/api/v1/retail/wishlist/${productId}`);
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /retail/wishlist → clear the entire wishlist */
export async function clearWishlist() {
  try {
    await api.delete('/lmd/api/v1/retail/wishlist');
  } catch (e) {
    unwrapError(e);
  }
}
