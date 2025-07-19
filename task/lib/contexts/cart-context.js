// lib/contexts/cart-context.js
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import * as cartAPI from '@/lib/api/cart';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const tokenReady = status === 'authenticated';

  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(new Set());
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchInProgress = useRef(false);
  const fetchTimeout = useRef(null);

  const CACHE_DURATION = 5 * 60 * 1000;

  const isCacheValid = useCallback(() => {
    if (!lastFetched) return false;
    return Date.now() - lastFetched < CACHE_DURATION;
  }, [lastFetched]);

  const reload = useCallback(async (force = false) => {
    if (fetchInProgress.current && !force) return;
    if (!force && isCacheValid()) return;

    fetchInProgress.current = true;
    setLoading(true);
    setError(null);

    try {
      const items = await cartAPI.fetchCart();
      setCart(items);
      setFetched(true);
      setLastFetched(Date.now());
    } catch (err) {
      console.error('❌ fetchCart error:', err);
      setError(err.message || 'Failed to fetch cart');
      toast.error(err.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, [isCacheValid]);

  const debouncedFetch = useCallback((force = false) => {
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);
    fetchTimeout.current = setTimeout(() => reload(force), 300);
  }, [reload]);

  useEffect(() => {
    if (tokenReady && !fetched) reload();
  }, [tokenReady, fetched, reload]);

  useEffect(() => () => {
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);
  }, []);

  const addToCart = useCallback(async (item) => {
    if (!tokenReady) {
      const message = 'Please login to add items to cart';
      setError(message);
      toast.error(message);
      return;
    }

    const variantId = item.id;
    setLoadingProducts(prev => new Set(prev).add(variantId));
    setError(null);

    try {
      await cartAPI.addOrUpdateItem(item.id, 1);
      await reload(true);
      toast.success('Item added to cart');
    } catch (err) {
      console.error('❌ addToCart error:', err);
      setError(err.message || 'Failed to add item to cart');
      toast.error(err.message || 'Failed to add item to cart');
    } finally {
      setLoadingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(variantId);
        return newSet;
      });
    }
  }, [tokenReady, reload]);

  const updateQuantity = useCallback(async (variantId, delta) => {
    if (!tokenReady) {
      toast.error('Please login to update cart');
      return;
    }

    const entryIndex = cart.findIndex(i => i.variantId === variantId);
    if (entryIndex === -1) {
      toast.error('Item not found in cart');
      return;
    }

    const oldCart = [...cart];
    const currentItem = cart[entryIndex];
    const newQty = currentItem.quantity + delta;

    const updatedCart = newQty > 0
      ? [...cart.slice(0, entryIndex), { ...currentItem, quantity: newQty }, ...cart.slice(entryIndex + 1)]
      : cart.filter(i => i.variantId !== variantId);

    setCart(updatedCart);
    setLoadingProducts(prev => new Set(prev).add(variantId));
    setError(null);

    try {
      const entry = oldCart[entryIndex];
      if (newQty < 1) {
        await cartAPI.removeItem(entry.id);
        toast.success('Item removed from cart');
      } else {
        await cartAPI.updateCartItem(entry.id, newQty);
        toast.success('Quantity updated');
      }
      await reload(true);
    } catch (err) {
      setCart(oldCart);
      setError(err.message || 'Failed to update quantity');
      toast.error(err.message || 'Failed to update quantity');
    } finally {
      setLoadingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(variantId);
        return newSet;
      });
    }
  }, [tokenReady, cart, reload]);

  const removeFromCart = useCallback(async (variantId) => {
    if (!tokenReady) {
      toast.error('Please login to remove items from cart');
      return;
    }

    const entry = cart.find(i => i.variantId === variantId);
    if (!entry) {
      toast.error('Item not found in cart');
      return;
    }

    const oldCart = [...cart];
    const updatedCart = cart.filter(i => i.variantId !== variantId);
    setCart(updatedCart);
    setLoadingProducts(prev => new Set(prev).add(variantId));
    setError(null);

    try {
      await cartAPI.removeItem(entry.id);
      await reload(true);
      toast.success('Item removed from cart');
    } catch (err) {
      setCart(oldCart);
      setError(err.message || 'Failed to remove item');
      toast.error(err.message || 'Failed to remove item');
    } finally {
      setLoadingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(variantId);
        return newSet;
      });
    }
  }, [tokenReady, cart, reload]);

  const clearAll = useCallback(async () => {
    if (!tokenReady) {
      toast.error('Please login to clear cart');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await cartAPI.clearCart();
      setCart([]);
      setLastFetched(Date.now());
      toast.success('Cart cleared');
    } catch (err) {
      setError(err.message || 'Failed to clear cart');
      toast.error(err.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  }, [tokenReady]);

  const refreshCart = useCallback(() => debouncedFetch(true), [debouncedFetch]);
  const clearError = useCallback(() => setError(null), []);
  const isProductLoading = useCallback(variantId => loadingProducts.has(variantId), [loadingProducts]);
  const getCartItem = useCallback(variantId => cart.find(item => item.variantId === variantId), [cart]);
  const isInCart = useCallback(variantId => cart.some(item => item.variantId === variantId), [cart]);
  const getItemQuantity = useCallback(variantId => {
    const item = cart.find(item => item.variantId === variantId);
    return item ? item.quantity : 0;
  }, [cart]);

  const totalQuantity = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalAmount = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const contextValue = useMemo(() => ({
    cart,
    isLoading,
    loadingProducts,
    error,
    fetched,
    lastFetched,
    totalQuantity,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart: clearAll,
    refreshCart,
    clearError,
    getCartItem,
    isInCart,
    getItemQuantity,
    isProductLoading,
    reload,
    cartItems: totalQuantity,
  }), [cart, isLoading, loadingProducts, error, fetched, lastFetched, totalQuantity, totalAmount, addToCart, updateQuantity, removeFromCart, clearAll, refreshCart, clearError, getCartItem, isInCart, getItemQuantity, isProductLoading, reload]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside <CartProvider>');
  return ctx;
}
