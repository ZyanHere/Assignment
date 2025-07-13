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

const CartContext = createContext();

export function CartProvider({ children, showCartInHeader = false }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const tokenReady = status === 'authenticated';

  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(new Set()); // Track loading per product
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);
  
  // Refs to prevent multiple simultaneous requests
  const fetchInProgress = useRef(false);
  const fetchTimeout = useRef(null);

  // Cache duration (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  const isCacheValid = useCallback(() => {
    if (!lastFetched) return false;
    return Date.now() - lastFetched < CACHE_DURATION;
  }, [lastFetched]);

  const reload = useCallback(async (force = false) => {
    // Prevent multiple simultaneous requests
    if (fetchInProgress.current && !force) {
      return;
    }

    // Use cache if valid and not forced
    if (!force && isCacheValid()) {
      return;
    }

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
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, [isCacheValid]);

  // Debounced fetch to prevent rapid successive calls
  const debouncedFetch = useCallback((force = false) => {
    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
    }
    
    fetchTimeout.current = setTimeout(() => {
      reload(force);
    }, 300);
  }, [reload]);

  // Fetch cart only when user is authenticated and not already fetched
  useEffect(() => {
    if (tokenReady && !fetched) {
      reload();
    }
  }, [tokenReady, fetched, reload]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
    };
  }, []);

  const addToCart = useCallback(
    async (item) => {
      if (!tokenReady) {
        setError('Please login to add items to cart');
        return;
      }

      const variantId = item.id;
      
      // Set loading state for this specific product
      setLoadingProducts(prev => new Set(prev).add(variantId));
      setError(null);

      try {
        // Add item to backend
        await cartAPI.addOrUpdateItem(item.id, 1);
        
        // Fetch updated cart
        await reload(true);
      } catch (err) {
        console.error('❌ addToCart error:', err);
        setError(err.message || 'Failed to add item to cart');
      } finally {
        // Clear loading state for this specific product
        setLoadingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(variantId);
          return newSet;
        });
      }
    },
    [tokenReady, reload]
  );

  const updateQuantity = useCallback(
    async (variantId, delta) => {
      if (!tokenReady) {
        setError('Please login to update cart');
        return;
      }

      // Set loading state for this specific product
      setLoadingProducts(prev => new Set(prev).add(variantId));
      setError(null);

      try {
        const entry = cart.find((i) => i.variantId === variantId);
        if (!entry) {
          setError('Item not found in cart');
          return;
        }

        const newQty = entry.quantity + delta;
        if (newQty < 1) {
          // Remove item if quantity becomes 0
          await cartAPI.removeItem(entry.id);
        } else {
          // Update quantity
          await cartAPI.updateCartItem(entry.id, newQty);
        }
        
        // Fetch updated cart
        await reload(true);
      } catch (err) {
        console.error('❌ updateQuantity error:', err);
        setError(err.message || 'Failed to update quantity');
      } finally {
        // Clear loading state for this specific product
        setLoadingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(variantId);
          return newSet;
        });
      }
    },
    [tokenReady, cart, reload]
  );

  const removeFromCart = useCallback(
    async (variantId) => {
      if (!tokenReady) {
        setError('Please login to remove items from cart');
        return;
      }

      // Set loading state for this specific product
      setLoadingProducts(prev => new Set(prev).add(variantId));
      setError(null);

      try {
        const entry = cart.find((i) => i.variantId === variantId);
        if (!entry) {
          setError('Item not found in cart');
          return;
        }

        await cartAPI.removeItem(entry.id);
        
        // Fetch updated cart
        await reload(true);
      } catch (err) {
        console.error('❌ removeFromCart error:', err);
        setError(err.message || 'Failed to remove item from cart');
      } finally {
        // Clear loading state for this specific product
        setLoadingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(variantId);
          return newSet;
        });
      }
    },
    [tokenReady, cart, reload]
  );

  const clearAll = useCallback(async () => {
    if (!tokenReady) {
      setError('Please login to clear cart');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await cartAPI.clearCart();
      setCart([]);
      setLastFetched(Date.now());
    } catch (err) {
      console.error('❌ clearCart error:', err);
      setError(err.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  }, [tokenReady]);

  // Manual refresh function
  const refreshCart = useCallback(() => {
    debouncedFetch(true);
  }, [debouncedFetch]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check if a specific product is loading
  const isProductLoading = useCallback((variantId) => {
    return loadingProducts.has(variantId);
  }, [loadingProducts]);

  // Memoized cart item lookup functions to prevent unnecessary re-renders
  const getCartItem = useCallback((variantId) => {
    return cart.find(item => item.variantId === variantId);
  }, [cart]);

  const isInCart = useCallback((variantId) => {
    return cart.some(item => item.variantId === variantId);
  }, [cart]);

  const getItemQuantity = useCallback((variantId) => {
    const item = cart.find(item => item.variantId === variantId);
    return item ? item.quantity : 0;
  }, [cart]);

  // Memoized totals to prevent unnecessary recalculations
  const totalQuantity = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0), 
    [cart]
  );

  const totalAmount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0), 
    [cart]
  );

  // Memoized context value to prevent unnecessary re-renders
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
  }), [
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
    clearAll,
    refreshCart,
    clearError,
    getCartItem,
    isInCart,
    getItemQuantity,
    isProductLoading,
    reload,
  ]);

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
