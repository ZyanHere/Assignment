import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { 
  fetchMoviesData,
  fetchMovieDetails,
  searchMovies,
  clearMoviesCache,
  clearSearchResults,
  setSelectedMovie
} from "@/lib/redux/movies/moviesSlice";

// Cache duration in milliseconds (5 minutes) - should match the one in moviesSlice
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * useMovies Hook with Caching Support
 * 
 * Provides access to movies state and actions with intelligent caching for the movies API.
 * 
 * Cache-related functions:
 * - isCacheValid(): Returns true if current cache is still valid
 * - needsDataFetch(): Returns true if data needs to be fetched (no data or cache expired)
 * - getCacheStatus(): Returns detailed cache information (validity, time remaining, etc.)
 * - forceRefreshData(): Forces a fresh data fetch by clearing cache first
 * - clearMoviesCache(): Manually clears the cache
 */
export const useMovies = () => {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movies);

  // Check if cache is valid
  const isCacheValidForMovies = useCallback(() => {
    return isCacheValid(moviesState.lastFetched);
  }, [moviesState.lastFetched]);

  // Get cache status information
  const getCacheStatus = useCallback(() => {
    if (!moviesState.lastFetched) {
      return {
        isValid: false,
        timeRemaining: 0,
        lastFetched: null,
        message: 'No cache available'
      };
    }

    const timeElapsed = Date.now() - moviesState.lastFetched;
    const timeRemaining = Math.max(0, CACHE_DURATION - timeElapsed);
    const isValid = timeRemaining > 0;

    return {
      isValid,
      timeRemaining,
      lastFetched: new Date(moviesState.lastFetched),
      message: isValid 
        ? `Cache valid for ${Math.round(timeRemaining / 1000)}s` 
        : 'Cache expired'
    };
  }, [moviesState.lastFetched]);

  // Check if we need to fetch data
  const needsDataFetch = useCallback(() => {
    const hasData = moviesState.movies.length > 0;
    return !hasData || !isCacheValid(moviesState.lastFetched);
  }, [moviesState.movies.length, moviesState.lastFetched]);

  // Force refresh data (ignores cache)
  const forceRefreshData = useCallback(() => {
    console.log('Force refreshing movies data...');
    dispatch(clearMoviesCache());
    dispatch(fetchMoviesData());
  }, [dispatch]);

  const actions = {
    fetchMoviesData: useCallback(() => dispatch(fetchMoviesData()), [dispatch]),
    fetchMovieDetails: useCallback((movieId) => dispatch(fetchMovieDetails(movieId)), [dispatch]),
    searchMovies: useCallback((searchParams) => dispatch(searchMovies(searchParams)), [dispatch]),
    clearMoviesCache: useCallback(() => dispatch(clearMoviesCache()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
    setSelectedMovie: useCallback((movie) => dispatch(setSelectedMovie(movie)), [dispatch]),
    forceRefreshData,
  };

  return {
    ...moviesState,
    ...actions,
    isCacheValid: isCacheValidForMovies,
    needsDataFetch,
    getCacheStatus,
  };
}; 