import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  fetchHotelsData,
  fetchHotelDetails,
  searchHotels,
  clearHotelsCache,
  clearSearchResults,
  setSelectedHotel
} from "@/lib/redux/hotels/hotelsSlice";

// Cache duration in milliseconds (5 minutes) - should match the one in hotelsSlice
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * useHotels Hook with Caching Support
 * 
 * Provides access to hotels state and actions with intelligent caching for the hotels API.
 * 
 * Cache-related functions:
 * - isCacheValid(): Returns true if current cache is still valid
 * - needsDataFetch(): Returns true if data needs to be fetched (no data or cache expired)
 * - getCacheStatus(): Returns detailed cache information (validity, time remaining, etc.)
 * - forceRefreshData(): Forces a fresh data fetch by clearing cache first
 * - clearHotelsCache(): Manually clears the cache
 */
export const useHotels = () => {
  const dispatch = useDispatch();
  const hotelsState = useSelector((state) => state.hotels);

  // Check if cache is valid
  const isCacheValidForHotels = useCallback(() => {
    return isCacheValid(hotelsState.lastFetched);
  }, [hotelsState.lastFetched]);

  // Get cache status information
  const getCacheStatus = useCallback(() => {
    if (!hotelsState.lastFetched) {
      return {
        isValid: false,
        timeRemaining: 0,
        lastFetched: null,
        message: 'No cache available'
      };
    }

    const timeElapsed = Date.now() - hotelsState.lastFetched;
    const timeRemaining = Math.max(0, CACHE_DURATION - timeElapsed);
    const isValid = timeRemaining > 0;

    return {
      isValid,
      timeRemaining,
      lastFetched: new Date(hotelsState.lastFetched),
      message: isValid 
        ? `Cache valid for ${Math.round(timeRemaining / 1000)}s` 
        : 'Cache expired'
    };
  }, [hotelsState.lastFetched]);

  // Check if we need to fetch data
  const needsDataFetch = useCallback(() => {
    const hasData = hotelsState.hotels.length > 0;
    return !hasData || !isCacheValid(hotelsState.lastFetched);
  }, [hotelsState.hotels.length, hotelsState.lastFetched]);

  // Force refresh data (ignores cache)
  const forceRefreshData = useCallback(() => {
    console.log('Force refreshing hotels data...');
    dispatch(clearHotelsCache());
    dispatch(fetchHotelsData());
  }, [dispatch]);

  const actions = {
    fetchHotelsData: useCallback(() => dispatch(fetchHotelsData()), [dispatch]),
    fetchHotelDetails: useCallback((hotelId) => dispatch(fetchHotelDetails(hotelId)), [dispatch]),
    searchHotels: useCallback((searchParams) => dispatch(searchHotels(searchParams)), [dispatch]),
    clearHotelsCache: useCallback(() => dispatch(clearHotelsCache()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
    setSelectedHotel: useCallback((hotel) => dispatch(setSelectedHotel(hotel)), [dispatch]),
    forceRefreshData,
  };

  return {
    ...hotelsState,
    ...actions,
    isCacheValid: isCacheValidForHotels,
    needsDataFetch,
    getCacheStatus,
  };
}; 