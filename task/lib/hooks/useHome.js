import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  setSelectedTab, 
  setIsMobile, 
  setNeedsScrolling, 
  resetHomeState,
  clearHomeCache,
  fetchComprehensiveHomeData,
  fetchCategories,
  fetchAllProducts,
  fetchProductsByCategory
} from "@/lib/redux/home/homeSlice";

// Cache duration in milliseconds (5 minutes) - should match the one in homeSlice
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};


export const useHome = () => {
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);

  // Check if cache is valid
  const isCacheValidForHome = useCallback(() => {
    return isCacheValid(homeState.lastFetched);
  }, [homeState.lastFetched]);

  // Get cache status information
  const getCacheStatus = useCallback(() => {
    if (!homeState.lastFetched) {
      return {
        isValid: false,
        timeRemaining: 0,
        lastFetched: null,
        message: 'No cache available'
      };
    }

    const timeElapsed = Date.now() - homeState.lastFetched;
    const timeRemaining = Math.max(0, CACHE_DURATION - timeElapsed);
    const isValid = timeRemaining > 0;

    return {
      isValid,
      timeRemaining,
      lastFetched: new Date(homeState.lastFetched),
      message: isValid 
        ? `Cache valid for ${Math.round(timeRemaining / 1000)}s` 
        : 'Cache expired'
    };
  }, [homeState.lastFetched]);

  // Check if we need to fetch data
  const needsDataFetch = useCallback(() => {
    const hasData = homeState.categories.length > 0 && homeState.allProducts.length > 0;
    return !hasData || !isCacheValid(homeState.lastFetched);
  }, [homeState.categories.length, homeState.allProducts.length, homeState.lastFetched]);

  // Force refresh data (ignores cache)
  const forceRefreshData = useCallback(() => {
    console.log('Force refreshing home data...');
    // Clear cache first, then fetch fresh data
    dispatch(clearHomeCache());
    dispatch(fetchComprehensiveHomeData());
  }, [dispatch]);

  const actions = {
    setSelectedTab: useCallback((tab) => dispatch(setSelectedTab(tab)), [dispatch]),
    setIsMobile: useCallback((isMobile) => dispatch(setIsMobile(isMobile)), [dispatch]),
    setNeedsScrolling: useCallback((needsScrolling) => dispatch(setNeedsScrolling(needsScrolling)), [dispatch]),
    resetHomeState: useCallback(() => dispatch(resetHomeState()), [dispatch]),
    clearHomeCache: useCallback(() => dispatch(clearHomeCache()), [dispatch]),
    fetchComprehensiveHomeData: useCallback(() => dispatch(fetchComprehensiveHomeData()), [dispatch]),
    fetchCategories: useCallback(() => dispatch(fetchCategories()), [dispatch]),
    fetchAllProducts: useCallback(() => dispatch(fetchAllProducts()), [dispatch]),
    fetchProductsByCategory: useCallback((categoryId) => dispatch(fetchProductsByCategory(categoryId)), [dispatch]),
    forceRefreshData,
  };

  return {
    ...homeState,
    ...actions,
    isCacheValid: isCacheValidForHome,
    needsDataFetch,
    getCacheStatus,
  };
}; 