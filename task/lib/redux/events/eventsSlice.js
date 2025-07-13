import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

// Async thunk for fetching events data
export const fetchEventsData = createAsyncThunk(
  'events/fetchEventsData',
  async (_, { rejectWithValue, getState }) => {
    // Check if data is already loaded and cache is still valid
    const state = getState();
    const hasData = state.events.events.length > 0;
    const cacheValid = isCacheValid(state.events.lastFetched);
    
    if (hasData && cacheValid && !state.events.eventsLoading) {
      console.log('Events data cache is valid, skipping API call');
      return {
        events: state.events.events,
        upcomingEvents: state.events.upcomingEvents,
        featuredEvents: state.events.featuredEvents,
        recommendedEvents: state.events.recommendedEvents,
        fromCache: true
      };
    }

    // If cache is expired or no data, fetch fresh data
    if (hasData && !cacheValid) {
      console.log('Events data cache expired, fetching fresh data...');
    } else if (!hasData) {
      console.log('No events data available, fetching initial data...');
    }

    try {
      console.log('Fetching events data from API...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/home/comprehensive?type=EVENTS&productsLimit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch events data');
      }

      const data = await response.json();
      console.log('Events data fetched successfully:', {
        events: data.data?.allProducts?.length || 0,
        categories: data.data?.categories?.length || 0,
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching events data:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching event details
export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products/${eventId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch event details');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for searching events
export const searchEvents = createAsyncThunk(
  'events/searchEvents',
  async (searchParams, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products?product_type=event_ticket&${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to search events');
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error searching events:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  events: [],
  upcomingEvents: [],
  featuredEvents: [],
  recommendedEvents: [],
  eventsLoading: false,
  eventsError: null,
  lastFetched: null,
  // Event details
  selectedEvent: null,
  eventDetailsLoading: false,
  eventDetailsError: null,
  // Search
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventsCache: (state) => {
      state.lastFetched = null;
      console.log('Events cache cleared');
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events Data
      .addCase(fetchEventsData.pending, (state) => {
        state.eventsLoading = true;
        state.eventsError = null;
      })
      .addCase(fetchEventsData.fulfilled, (state, action) => {
        state.eventsLoading = false;
        
        // Only update data if it's not from cache
        if (!action.payload.fromCache) {
          const allEvents = action.payload.allProducts || [];
          state.events = allEvents;
          
          // Filter events for different sections based on timing and features
          const now = new Date();
          state.upcomingEvents = allEvents.filter(event => {
            if (!event.timing?.start_date) return false;
            const startDate = new Date(event.timing.start_date);
            return startDate > now;
          }).slice(0, 6);
          
          state.featuredEvents = allEvents.filter(event => event.is_featured).slice(0, 6);
          state.recommendedEvents = allEvents.slice(0, 6);
          
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchEventsData.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.payload;
      })
      // Fetch Event Details
      .addCase(fetchEventDetails.pending, (state) => {
        state.eventDetailsLoading = true;
        state.eventDetailsError = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.eventDetailsLoading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.eventDetailsLoading = false;
        state.eventDetailsError = action.payload;
      })
      // Search Events
      .addCase(searchEvents.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { 
  clearEventsCache,
  clearSearchResults,
  setSelectedEvent
} = eventsSlice.actions;

export default eventsSlice.reducer; 