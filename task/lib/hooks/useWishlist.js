import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
  updateWishlistItem,
  checkWishlistStatus,
  clearWishlist,
  moveWishlistToCart,
  selectWishlistItems,
  selectWishlistLoading,
  selectWishlistError,
  selectWishlistSummary,
  selectWishlistPagination,
  selectWishlistStatus,
  selectProductLoading,
  selectIsInWishlist,
  clearError
} from '../redux/wishlist/wishlistSlice';

// Global state to track wishlist fetch across all hook instances
const globalWishlistState = {
  hasFetched: false,
  isFetching: false,
  lastFetchTime: null,
  currentToken: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  
  const items = useSelector(selectWishlistItems);
  const loading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);
  const summary = useSelector(selectWishlistSummary);
  const pagination = useSelector(selectWishlistPagination);
  const wishlistStatus = useSelector(selectWishlistStatus);
  const productLoading = useSelector(selectProductLoading);

  // Check if cache is still valid
  const isCacheValid = () => {
    if (globalWishlistState.lastFetchTime === null) return false;
    return Date.now() - globalWishlistState.lastFetchTime < CACHE_DURATION;
  };

  // Check if we should fetch wishlist
  const shouldFetchWishlist = () => {
    const token = session?.user?.token;
    
    // No token, don't fetch
    if (!token) return false;
    
    // Token changed, reset state and fetch
    if (globalWishlistState.currentToken !== token) {
      globalWishlistState.hasFetched = false;
      globalWishlistState.isFetching = false;
      globalWishlistState.lastFetchTime = null;
      globalWishlistState.currentToken = token;
      return true;
    }
    
    // Already fetched and cache is valid, don't fetch
    if (globalWishlistState.hasFetched && isCacheValid()) return false;
    
    // Currently fetching, don't fetch again
    if (globalWishlistState.isFetching) return false;
    
    return true;
  };

  // Fetch wishlist on component mount if needed
  useEffect(() => {
    if (shouldFetchWishlist()) {
      globalWishlistState.hasFetched = true;
      globalWishlistState.isFetching = true;
      globalWishlistState.lastFetchTime = Date.now();
      
      dispatch(fetchWishlist()).finally(() => {
        globalWishlistState.isFetching = false;
      });
    }
  }, [dispatch, session?.user?.token]);

  // Reset global state when user logs out
  useEffect(() => {
    if (!session?.user?.token) {
      globalWishlistState.hasFetched = false;
      globalWishlistState.isFetching = false;
      globalWishlistState.lastFetchTime = null;
      globalWishlistState.currentToken = null;
    }
  }, [session?.user?.token]);

  const addItem = async (productId, notes = 'Added to wishlist', priority = 'medium') => {
    if (!session?.user?.token) {
      throw new Error('User must be authenticated to add items to wishlist');
    }
    return dispatch(addToWishlist({ productId, notes, priority }));
  };

  const removeItem = async (productId) => {
    if (!session?.user?.token) {
      throw new Error('User must be authenticated to remove items from wishlist');
    }
    return dispatch(removeFromWishlist(productId));
  };

  const updateItem = async (productId, notes, priority) => {
    if (!session?.user?.token) {
      throw new Error('User must be authenticated to update wishlist items');
    }
    return dispatch(updateWishlistItem({ productId, notes, priority }));
  };

  const checkStatus = async (productId) => {
    if (!session?.user?.token) {
      return false;
    }
    return dispatch(checkWishlistStatus(productId));
  };

  const clearAll = async () => {
    if (!session?.user?.token) {
      throw new Error('User must be authenticated to clear wishlist');
    }
    return dispatch(clearWishlist());
  };

  const moveToCart = async () => {
    if (!session?.user?.token) {
      throw new Error('User must be authenticated to move wishlist to cart');
    }
    return dispatch(moveWishlistToCart());
  };

  const clearErrorState = () => {
    dispatch(clearError());
  };

  const isInWishlist = (productId) => {
    return wishlistStatus[productId] || false;
  };

  const isProductLoading = (productId) => {
    return productLoading[productId] || false;
  };

  return {
    items,
    loading,
    error,
    summary,
    pagination,
    addItem,
    removeItem,
    updateItem,
    checkStatus,
    clearAll,
    moveToCart,
    clearErrorState,
    isInWishlist,
    isProductLoading
  };
}; 