'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import * as api from "@/lib/api/cart";
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const CartContext = createContext(null);

export function CartProvider({ children, showCartInHeader = false }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const token = session?.user?.token;

  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [fetched, setFetched] = useState(false); // avoid multiple fetches
  // const [error, setError] = useState(null);

  // load on mount
  useEffect(() => {
    const shouldFetch = 
      status === 'authenticated' &&
      token &&
      pathname !== '/cart' &&
      !fetched &&
      (pathname === '/cart' || showCartInHeader);

      if( shouldFetch ) {
        fetchCart();
      }
  }, [status, token, pathname, showCartInHeader, fetched]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await api.fetchCart(token);
      setCart(res?.data?.items || []);
      setSummary(res?.data?.cart || {});
      setFetched(true);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setIsLoading(false);
    }
  };


    const addToCart = async (variantId, quantity = 1) => {
    try {
      setIsLoading(true);
      await api.addToCart(token, variantId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      setIsLoading(true);
      await api.updateCartItem(token, cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("❌ Quantity update failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      setIsLoading(true);
      await api.removeFromCart(token, cartItemId);
      await fetchCart();
    } catch (err) {
      console.error("❌ Remove item failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      await api.clearCart(token);
      await fetchCart();
    } catch (err) {
      console.error("❌ Clear cart failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        summary,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside <CartProvider>');
  return ctx;
}
