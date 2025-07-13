import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  fetchBuffetData,
  fetchRestaurantDetails,
  searchRestaurants,
  clearBuffetCache,
  clearSearchResults,
  setSelectedRestaurant
} from "@/lib/redux/buffet/buffetSlice";

// Cache duration in milliseconds (5 minutes) - should match the one in buffetSlice
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * useBuffet Hook with Caching Support
 * 
 * Provides access to buffet/restaurant state and actions with intelligent caching for the buffet API.
 * 
 * Cache-related functions:
 * - isCacheValid(): Returns true if current cache is still valid
 * - needsDataFetch(): Returns true if data needs to be fetched (no data or cache expired)
 * - getCacheStatus(): Returns detailed cache information (validity, time remaining, etc.)
 * - forceRefreshData(): Forces a fresh data fetch by clearing cache first
 * - clearBuffetCache(): Manually clears the cache
 */
export const useBuffet = () => {
  const dispatch = useDispatch();
  const buffetState = useSelector((state) => state.buffet);

  // Check if cache is valid
  const isCacheValidForBuffet = useCallback(() => {
    return isCacheValid(buffetState.lastFetched);
  }, [buffetState.lastFetched]);

  // Get cache status information
  const getCacheStatus = useCallback(() => {
    if (!buffetState.lastFetched) {
      return {
        isValid: false,
        timeRemaining: 0,
        lastFetched: null,
        message: 'No cache available'
      };
    }

    const timeElapsed = Date.now() - buffetState.lastFetched;
    const timeRemaining = Math.max(0, CACHE_DURATION - timeElapsed);
    const isValid = timeRemaining > 0;

    return {
      isValid,
      timeRemaining,
      lastFetched: new Date(buffetState.lastFetched),
      message: isValid 
        ? `Cache valid for ${Math.round(timeRemaining / 1000)}s` 
        : 'Cache expired'
    };
  }, [buffetState.lastFetched]);

  // Check if we need to fetch data
  const needsDataFetch = useCallback(() => {
    const hasData = buffetState.restaurants.length > 0;
    return !hasData || !isCacheValid(buffetState.lastFetched);
  }, [buffetState.restaurants.length, buffetState.lastFetched]);

  // Force refresh data (ignores cache)
  const forceRefreshData = useCallback(() => {
    console.log('Force refreshing buffet data...');
    dispatch(clearBuffetCache());
    dispatch(fetchBuffetData());
  }, [dispatch]);

  const actions = {
    fetchBuffetData: useCallback(() => dispatch(fetchBuffetData()), [dispatch]),
    fetchRestaurantDetails: useCallback((restaurantId) => dispatch(fetchRestaurantDetails(restaurantId)), [dispatch]),
    searchRestaurants: useCallback((searchParams) => dispatch(searchRestaurants(searchParams)), [dispatch]),
    clearBuffetCache: useCallback(() => dispatch(clearBuffetCache()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
    setSelectedRestaurant: useCallback((restaurant) => dispatch(setSelectedRestaurant(restaurant)), [dispatch]),
    forceRefreshData,
  };

  return {
    ...buffetState,
    ...actions,
    isCacheValid: isCacheValidForBuffet,
    needsDataFetch,
    getCacheStatus,
  };
}; 