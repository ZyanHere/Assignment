import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

// Async thunk for fetching buffet data
export const fetchBuffetData = createAsyncThunk(
  'buffet/fetchBuffetData',
  async (_, { rejectWithValue, getState }) => {
    // Check if data is already loaded and cache is still valid
    const state = getState();
    const hasData = state.buffet.restaurants.length > 0;
    const cacheValid = isCacheValid(state.buffet.lastFetched);
    
    if (hasData && cacheValid && !state.buffet.buffetLoading) {
      console.log('Buffet data cache is valid, skipping API call');
      return {
        restaurants: state.buffet.restaurants,
        popular: state.buffet.popular,
        inYourArea: state.buffet.inYourArea,
        previousChoices: state.buffet.previousChoices,
        fromCache: true
      };
    }

    // If cache is expired or no data, fetch fresh data
    if (hasData && !cacheValid) {
      console.log('Buffet data cache expired, fetching fresh data...');
    } else if (!hasData) {
      console.log('No buffet data available, fetching initial data...');
    }

    try {
      console.log('Fetching buffet data from API...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/home/comprehensive?type=BUFFET&productsLimit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch buffet data');
      }

      const data = await response.json();
      console.log('Buffet data fetched successfully:', {
        restaurants: data.data?.allProducts?.length || 0,
        categories: data.data?.categories?.length || 0,
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching buffet data:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching restaurant details
export const fetchRestaurantDetails = createAsyncThunk(
  'buffet/fetchRestaurantDetails',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products/${restaurantId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch restaurant details');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for searching restaurants
export const searchRestaurants = createAsyncThunk(
  'buffet/searchRestaurants',
  async (searchParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products?product_type=buffet_ticket&${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to search restaurants');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  restaurants: [],
  popular: [],
  inYourArea: [],
  previousChoices: [],
  buffetLoading: false,
  buffetError: null,
  lastFetched: null,
  // Restaurant details
  selectedRestaurant: null,
  restaurantDetailsLoading: false,
  restaurantDetailsError: null,
  // Search
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const buffetSlice = createSlice({
  name: 'buffet',
  initialState,
  reducers: {
    clearBuffetCache: (state) => {
      state.lastFetched = null;
      console.log('Buffet cache cleared');
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Buffet Data
      .addCase(fetchBuffetData.pending, (state) => {
        state.buffetLoading = true;
        state.buffetError = null;
      })
      .addCase(fetchBuffetData.fulfilled, (state, action) => {
        state.buffetLoading = false;
        
        // Only update data if it's not from cache
        if (!action.payload.fromCache) {
          const allRestaurants = action.payload.allProducts || [];
          state.restaurants = allRestaurants;
          
          // Filter restaurants for different sections
          state.popular = allRestaurants.filter(restaurant => 
            restaurant.is_featured || restaurant.rating?.average >= 4.5
          ).slice(0, 7);
          
          state.inYourArea = allRestaurants.slice(0, 7);
          state.previousChoices = allRestaurants.slice(0, 8);
          
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchBuffetData.rejected, (state, action) => {
        state.buffetLoading = false;
        state.buffetError = action.payload;
      })
      // Fetch Restaurant Details
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.restaurantDetailsLoading = true;
        state.restaurantDetailsError = null;
      })
      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.restaurantDetailsLoading = false;
        state.selectedRestaurant = action.payload;
      })
      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.restaurantDetailsLoading = false;
        state.restaurantDetailsError = action.payload;
      })
      // Search Restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { 
  clearBuffetCache,
  clearSearchResults,
  setSelectedRestaurant
} = buffetSlice.actions;

export default buffetSlice.reducer; 