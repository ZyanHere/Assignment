import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  fetchEventsData,
  fetchEventDetails,
  searchEvents,
  clearEventsCache,
  clearSearchResults,
  setSelectedEvent
} from "@/lib/redux/events/eventsSlice";

// Cache duration in milliseconds (5 minutes) - should match the one in eventsSlice
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * useEvents Hook with Caching Support
 * 
 * Provides access to events state and actions with intelligent caching for the events API.
 * 
 * Cache-related functions:
 * - isCacheValid(): Returns true if current cache is still valid
 * - needsDataFetch(): Returns true if data needs to be fetched (no data or cache expired)
 * - getCacheStatus(): Returns detailed cache information (validity, time remaining, etc.)
 * - forceRefreshData(): Forces a fresh data fetch by clearing cache first
 * - clearEventsCache(): Manually clears the cache
 */
export const useEvents = () => {
  const dispatch = useDispatch();
  const eventsState = useSelector((state) => state.events);

  // Check if cache is valid
  const isCacheValidForEvents = useCallback(() => {
    return isCacheValid(eventsState.lastFetched);
  }, [eventsState.lastFetched]);

  // Get cache status information
  const getCacheStatus = useCallback(() => {
    if (!eventsState.lastFetched) {
      return {
        isValid: false,
        timeRemaining: 0,
        lastFetched: null,
        message: 'No cache available'
      };
    }

    const timeElapsed = Date.now() - eventsState.lastFetched;
    const timeRemaining = Math.max(0, CACHE_DURATION - timeElapsed);
    const isValid = timeRemaining > 0;

    return {
      isValid,
      timeRemaining,
      lastFetched: new Date(eventsState.lastFetched),
      message: isValid 
        ? `Cache valid for ${Math.round(timeRemaining / 1000)}s` 
        : 'Cache expired'
    };
  }, [eventsState.lastFetched]);

  // Check if we need to fetch data
  const needsDataFetch = useCallback(() => {
    const hasData = eventsState.events.length > 0;
    return !hasData || !isCacheValid(eventsState.lastFetched);
  }, [eventsState.events.length, eventsState.lastFetched]);

  // Force refresh data (ignores cache)
  const forceRefreshData = useCallback(() => {
    console.log('Force refreshing events data...');
    dispatch(clearEventsCache());
    dispatch(fetchEventsData());
  }, [dispatch]);

  const actions = {
    fetchEventsData: useCallback(() => dispatch(fetchEventsData()), [dispatch]),
    fetchEventDetails: useCallback((eventId) => dispatch(fetchEventDetails(eventId)), [dispatch]),
    searchEvents: useCallback((searchParams) => dispatch(searchEvents(searchParams)), [dispatch]),
    clearEventsCache: useCallback(() => dispatch(clearEventsCache()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
    setSelectedEvent: useCallback((event) => dispatch(setSelectedEvent(event)), [dispatch]),
    forceRefreshData,
  };

  return {
    ...eventsState,
    ...actions,
    isCacheValid: isCacheValidForEvents,
    needsDataFetch,
    getCacheStatus,
  };
}; 