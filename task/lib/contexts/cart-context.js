"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  addCartItem,
} from "@/lib/api/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  // state: current cart items + loading flag
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // on mount: fetch authoritative cart
  useEffect(() => {
    fetchCart();
  }, []);

  // fetchCart(): Retrieve full cart from server
  const fetchCart = async () => {
    try {
      const cartObj = await getCart();
      const items = cartObj.items || [];
      const formatted = items.map((item) => ({
        id:        item.variantId,
        productId: item.productId,
        variantId: item.variantId,
        name:      item.productName,
        image:     item.imageUrl,
        price:     item.price,
        quantity:  item.quantity,
        brand:     item.variantName || item.brandName,
      }));
      setCart(formatted);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    }
  };

  // updateQuantity(): optimistic + sync
  const updateQuantity = async (variantId, delta) => {
    const item = cart.find((i) => i.variantId === variantId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    // 1) Optimistic UI update
    setCart((prev) =>
      prev.map((i) =>
        i.variantId === variantId ? { ...i, quantity: newQty } : i
      )
    );

    // 2) Persist to server
    try {
      await updateCartItem({
        productId: item.productId,
        variantId,
        quantity: newQty,
      });
    } catch (err) {
      console.error("⚠️ Sync failed, rolling back:", err);
      await fetchCart();
    }
  };

  // removeFromCart(): optimistic removal + rollback
  const removeFromCart = async (variantId) => {
    const prev = [...cart];
    // 1) Optimistically remove
    setCart((prevState) =>
      prevState.filter((i) => i.variantId !== variantId)
    );

    // 2) Persist removal
    try {
      const item = prev.find((i) => i.variantId === variantId);
      await removeCartItem({
        productId: item.productId,
        variantId,
      });
    } catch (err) {
      console.error("⚠️ Remove failed, restoring:", err);
      setCart(prev);
    }
  };

  // addItem(): optimistic add + final refetch
  const addItem = async ({ productId, variantId, quantity = 1 }) => {
    const prev = [...cart];
    // 1) Optimistically append placeholder
    setCart((prevState) => [
      ...prevState,
      { id: variantId, productId, variantId, quantity, image: "", name: "", price: 0, brand: "" },
    ]);

    // 2) Persist addition
    try {
      await addCartItem({ productId, variantId, quantity });
      await fetchCart();
    } catch (err) {
      console.error("⚠️ Add failed, reverting:", err);
      setCart(prev);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, isLoading, fetchCart, updateQuantity, removeFromCart, addItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}