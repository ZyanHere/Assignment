
import axios from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/cart/me";

// Helper: retrieve current session’s token
async function getToken() {
  const session = await getSession();
  if (!session?.user?.token) {
    throw new Error("No session found");
  }
  return session.user.token;
}

// 1️⃣ Fetch entire cart
export async function getCart() {
  const token = await getToken();
  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("🛒 [getCart] raw response:", JSON.stringify(res.data, null, 2));
  // Assumes response shape: { data: { cart: { items: [...] } } }
  return res.data.data.cart;
}

// 2️⃣ Update a single item’s quantity
export async function updateCartItem({ productId, variantId, quantity }) {
  const token = await getToken();
  const res = await axios.put(
    `${BASE_URL}/items`,
    { productId, variantId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.data.cart;
}

// 3️⃣ Remove an item
export async function removeCartItem({ productId, variantId }) {
  const token = await getToken();
  const res = await axios.delete(`${BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: { productId, variantId },
  });
  return res.data.data.cart;
}

// 4️⃣ Add a new item
export async function addCartItem({ productId, variantId, quantity }) {
  const token = await getToken();
  const res = await axios.post(
    `${BASE_URL}/items`,
    { productId, variantId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.data.cart;
}