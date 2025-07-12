// lib/contexts/cart-context.js
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import * as cartAPI from '@/lib/api/cart';

const CartContext = createContext();

export function CartProvider({ children, showCartInHeader = false }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const tokenReady = status === 'authenticated';

  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const items = await cartAPI.fetchCart();
      setCart(items);
      setFetched(true);
    } catch (err) {
      console.error('❌ fetchCart error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Smart initial fetch
  useEffect(() => {
    const shouldFetch =
      tokenReady &&
      !fetched;

    if (shouldFetch) {
      reload();
    }
  }, [tokenReady, fetched, reload]);

  const addToCart = useCallback(
    async (item) => {
      setLoading(true);
      try {
        await cartAPI.addOrUpdateItem(item.id, 1);
        await reload();
      } catch (err) {
        console.error('❌ addToCart error:', err);
      } finally {
        setLoading(false);
      }
    },
    [reload]
  );

  const updateQuantity = useCallback(
    async (variantId, delta) => {
      setLoading(true);
      try {
        const entry = cart.find((i) => i.variantId === variantId);
        if (!entry) return;
        const newQty = entry.quantity + delta;
        if (newQty < 1) return;
        await cartAPI.updateCartItem(entry.id, newQty);
        await reload();
      } catch (err) {
        console.error('❌ updateQuantity error:', err);
      } finally {
        setLoading(false);
      }
    },
    [cart, reload]
  );

  const removeFromCart = useCallback(
    async (variantId) => {
      setLoading(true);
      try {
        const entry = cart.find((i) => i.variantId === variantId);
        if (!entry) return;
        await cartAPI.removeItem(entry.id);
        await reload();
      } catch (err) {
        console.error('❌ removeFromCart error:', err);
      } finally {
        setLoading(false);
      }
    },
    [cart, reload]
  );

  const clearAll = useCallback(async () => {
    setLoading(true);
    try {
      await cartAPI.clearCart();
      setCart([]);
    } catch (err) {
      console.error('❌ clearCart error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart: clearAll,
        reload,
        cartItems:cart.reduce((sum, item) => sum + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside <CartProvider>');
  return ctx;
}
