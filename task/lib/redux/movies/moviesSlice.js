import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

// Async thunk for fetching movies data
export const fetchMoviesData = createAsyncThunk(
  'movies/fetchMoviesData',
  async (_, { rejectWithValue, getState }) => {
    // Check if data is already loaded and cache is still valid
    const state = getState();
    const hasData = state.movies.movies.length > 0;
    const cacheValid = isCacheValid(state.movies.lastFetched);
    
    if (hasData && cacheValid && !state.movies.moviesLoading) {
      console.log('Movies data cache is valid, skipping API call');
      return {
        movies: state.movies.movies,
        fewMinutesLeft: state.movies.fewMinutesLeft,
        popularNow: state.movies.popularNow,
        recommended: state.movies.recommended,
        fromCache: true
      };
    }

    // If cache is expired or no data, fetch fresh data
    if (hasData && !cacheValid) {
      console.log('Movies data cache expired, fetching fresh data...');
    } else if (!hasData) {
      console.log('No movies data available, fetching initial data...');
    }

    try {
      console.log('Fetching movies data from API...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/home/comprehensive?type=MOVIES&productsLimit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch movies data');
      }

      const data = await response.json();
      console.log('Movies data fetched successfully:', {
        movies: data.data?.allProducts?.length || 0,
        categories: data.data?.categories?.length || 0,
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching movies data:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products/${movieId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch movie details');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for searching movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products?product_type=movie_ticket&${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to search movies');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  movies: [],
  fewMinutesLeft: [],
  popularNow: [],
  recommended: [],
  moviesLoading: false,
  moviesError: null,
  lastFetched: null,
  // Movie details
  selectedMovie: null,
  movieDetailsLoading: false,
  movieDetailsError: null,
  // Search
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMoviesCache: (state) => {
      state.lastFetched = null;
      console.log('Movies cache cleared');
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies Data
      .addCase(fetchMoviesData.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(fetchMoviesData.fulfilled, (state, action) => {
        state.moviesLoading = false;
        
        // Only update data if it's not from cache
        if (!action.payload.fromCache) {
          const allMovies = action.payload.allProducts || [];
          state.movies = allMovies;
          
          // Filter movies for different sections based on timing and popularity
          const now = new Date();
          state.fewMinutesLeft = allMovies.filter(movie => {
            if (!movie.timing) return false;
            const startTime = new Date(movie.timing.start_date);
            const timeDiff = startTime - now;
            return timeDiff > 0 && timeDiff <= 30 * 60 * 1000; // Within 30 minutes
          }).slice(0, 6);
          
          state.popularNow = allMovies.filter(movie => movie.is_featured || movie.rating?.average >= 4.5).slice(0, 6);
          state.recommended = allMovies.slice(0, 6);
          
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchMoviesData.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.payload;
      })
      // Fetch Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetailsLoading = true;
        state.movieDetailsError = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetailsLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetailsLoading = false;
        state.movieDetailsError = action.payload;
      })
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { 
  clearMoviesCache,
  clearSearchResults,
  setSelectedMovie
} = moviesSlice.actions;

export default moviesSlice.reducer; 