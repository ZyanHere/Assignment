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
import * as wishlistAPI from '@/lib/api/wishlist';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const tokenReady = status === 'authenticated';

  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const items = await wishlistAPI.fetchWishlist();
      setWishlist(items);
      setFetched(true);
    } catch (err) {
      console.error('❌ fetchWishlist error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const shouldFetch = tokenReady && !fetched;
    if (shouldFetch) {
      reload();
    }
  }, [tokenReady, fetched, reload]);

  const addToWishlist = useCallback(
    async (productId) => {
      setLoading(true);
      try {
        await wishlistAPI.addToWishlist(productId);
        await reload();
      } catch (err) {
        console.error('❌ addToWishlist error:', err);
      } finally {
        setLoading(false);
      }
    },
    [reload]
  );

  const removeFromWishlist = useCallback(
    async (productId) => {
      setLoading(true);
      try {
        await wishlistAPI.removeFromWishlist(productId);
        await reload();
      } catch (err) {
        console.error('❌ removeFromWishlist error:', err);
      } finally {
        setLoading(false);
      }
    },
    [reload]
  );

  const clearWishlist = useCallback(async () => {
    setLoading(true);
    try {
      await wishlistAPI.clearWishlist();
      setWishlist([]);
    } catch (err) {
      console.error('❌ clearWishlist error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        reload,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside <WishlistProvider>');
  return ctx;
}
