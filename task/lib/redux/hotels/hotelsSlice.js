import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

// Async thunk for fetching hotels data
export const fetchHotelsData = createAsyncThunk(
  'hotels/fetchHotelsData',
  async (_, { rejectWithValue, getState }) => {
    // Check if data is already loaded and cache is still valid
    const state = getState();
    const hasData = state.hotels.hotels.length > 0;
    const cacheValid = isCacheValid(state.hotels.lastFetched);
    
    if (hasData && cacheValid && !state.hotels.hotelsLoading) {
      console.log('Hotels data cache is valid, skipping API call');
      return {
        hotels: state.hotels.hotels,
        mostPopular: state.hotels.mostPopular,
        recommended: state.hotels.recommended,
        fromCache: true
      };
    }

    // If cache is expired or no data, fetch fresh data
    if (hasData && !cacheValid) {
      console.log('Hotels data cache expired, fetching fresh data...');
    } else if (!hasData) {
      console.log('No hotels data available, fetching initial data...');
    }

    try {
      console.log('Fetching hotels data from API...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/home/comprehensive?type=HOTELS&productsLimit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch hotels data');
      }

      const data = await response.json();
      console.log('Hotels data fetched successfully:', {
        hotels: data.data?.allProducts?.length || 0,
        categories: data.data?.categories?.length || 0,
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching hotels data:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching hotel details
export const fetchHotelDetails = createAsyncThunk(
  'hotels/fetchHotelDetails',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/hotels/${hotelId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch hotel details');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for searching hotels
export const searchHotels = createAsyncThunk(
  'hotels/searchHotels',
  async (searchParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/hotels/search?${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to search hotels');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  hotels: [],
  mostPopular: [],
  recommended: [],
  hotelsLoading: false,
  hotelsError: null,
  lastFetched: null,
  // Hotel details
  selectedHotel: null,
  hotelDetailsLoading: false,
  hotelDetailsError: null,
  // Search
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    clearHotelsCache: (state) => {
      state.lastFetched = null;
      console.log('Hotels cache cleared');
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Hotels Data
      .addCase(fetchHotelsData.pending, (state) => {
        state.hotelsLoading = true;
        state.hotelsError = null;
      })
      .addCase(fetchHotelsData.fulfilled, (state, action) => {
        state.hotelsLoading = false;
        
        // Only update data if it's not from cache
        if (!action.payload.fromCache) {
          state.hotels = action.payload.allProducts || [];
          state.mostPopular = action.payload.allProducts?.filter(hotel => hotel.is_featured) || [];
          state.recommended = action.payload.allProducts?.slice(0, 6) || [];
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchHotelsData.rejected, (state, action) => {
        state.hotelsLoading = false;
        state.hotelsError = action.payload;
      })
      // Fetch Hotel Details
      .addCase(fetchHotelDetails.pending, (state) => {
        state.hotelDetailsLoading = true;
        state.hotelDetailsError = null;
      })
      .addCase(fetchHotelDetails.fulfilled, (state, action) => {
        state.hotelDetailsLoading = false;
        state.selectedHotel = action.payload;
      })
      .addCase(fetchHotelDetails.rejected, (state, action) => {
        state.hotelDetailsLoading = false;
        state.hotelDetailsError = action.payload;
      })
      // Search Hotels
      .addCase(searchHotels.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { 
  clearHotelsCache,
  clearSearchResults,
  setSelectedHotel
} = hotelsSlice.actions;

export default hotelsSlice.reducer; 