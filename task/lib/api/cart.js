// lib/api/cart.js
import axios from "axios";
import { getSession } from "next-auth/react";

// 1) Must be set to your production Cart Service base (no trailing /items)
const BASE_URL = process.env.NEXT_PUBLIC_CART_BASE_URL;
if (!BASE_URL) {
  throw new Error("≫ NEXT_PUBLIC_CART_BASE_URL is not defined");
}

// Helper: retrieve current session’s token
async function getToken() {
  const session = await getSession();
  if (!session?.user?.token) {
    throw new Error("≫ No session token found; user must be signed in");
  }
  return session.user.token;
}

// 4.2 Retrieve Cart Contents
export async function getCart() {
  const token = await getToken();
  console.log("🔍 [getCart] URL:", BASE_URL);
  console.log("🔑 [getCart] token:", token);

  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("🛒 [getCart] response:", res.status, res.data);
    return res.data.data.cart;
  } catch (err) {
    console.error("❌ [getCart] failed:", {
      message: err.message,                   // Network Error, timeout, etc.
      status:  err.response?.status,          // e.g. 403, 500
      data:    err.response?.data,            // server’s JSON error payload
    });
    throw err;
  }
}

// 4.3 Update Cart Item Quantity
export async function updateCartItem({ productId, variantId, quantity }) {
  const token = await getToken();
  const url = `${BASE_URL}/items`;
  console.log("✏️ [updateCartItem] URL:", url, { productId, variantId, quantity });

  try {
    const res = await axios.put(
      url,
      { productId, variantId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data.cart;
  } catch (err) {
    console.error("❌ [updateCartItem] failed:", err.message, err.response?.data);
    throw err;
  }
}

// 4.4 Remove Item from Cart
export async function removeCartItem({ productId, variantId }) {
  const token = await getToken();
  const url = `${BASE_URL}/items`;
  console.log("🗑️ [removeCartItem] URL:", url, { productId, variantId });

  try {
    const res = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
      data:    { productId, variantId },
    });
    return res.data.data.cart;
  } catch (err) {
    console.error("❌ [removeCartItem] failed:", err.message, err.response?.data);
    throw err;
  }
}

// 4.1 Add Item to Cart
export async function addCartItem({ productId, variantId, quantity }) {
  const token = await getToken();
  const url = `${BASE_URL}/items`;
  console.log("➕ [addCartItem] URL:", url, { productId, variantId, quantity });

  try {
    const res = await axios.post(
      url,
      { productId, variantId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data.cart;
  } catch (err) {
    console.error("❌ [addCartItem] failed:", err.message, err.response?.data);
    throw err;
  }
}
