import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/lmd/api/v1/retail/wishlist');
      return response.data.data || response.data;
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId, notes, priority }, { rejectWithValue }) => {
    try {
      const response = await api.post('/lmd/api/v1/retail/wishlist', {
        product_id: productId,
        notes: notes || 'Added to wishlist', // Provide default note if empty
        priority: priority || 'medium'
      });
      return response.data.data || response.data;
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/lmd/api/v1/retail/wishlist/${productId}`);
      return { productId, ...response.data.data };
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to remove from wishlist');
    }
  }
);

export const updateWishlistItem = createAsyncThunk(
  'wishlist/updateWishlistItem',
  async ({ productId, notes, priority }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/lmd/api/v1/retail/wishlist/${productId}`, {
        notes,
        priority
      });
      return response.data.data || response.data;
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to update wishlist item');
    }
  }
);

export const checkWishlistStatus = createAsyncThunk(
  'wishlist/checkWishlistStatus',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lmd/api/v1/retail/wishlist/check/${productId}`);
      return { productId, isInWishlist: response.data.data.isInWishlist };
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to check wishlist status');
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/lmd/api/v1/retail/wishlist');
      return response.data.data || response.data;
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to clear wishlist');
    }
  }
);

export const moveWishlistToCart = createAsyncThunk(
  'wishlist/moveWishlistToCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/lmd/api/v1/retail/wishlist/move-to-cart');
      return response.data.data || response.data;
    } catch (error) {
      const errorData = error.response?.data || error;
      return rejectWithValue(errorData.message || 'Failed to move wishlist to cart');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  wishlistStatus: {}, // Track wishlist status for individual products
  productLoading: {}, // Track loading state for individual products
  summary: {
    totalItems: 0,
    totalValue: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    latestAdded: null
  },
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setWishlistStatus: (state, action) => {
      const { productId, isInWishlist } = action.payload;
      state.wishlistStatus[productId] = isInWishlist;
    },
    clearWishlistStatus: (state) => {
      state.wishlistStatus = {};
    },
    setProductLoading: (state, action) => {
      const { productId, loading } = action.payload;
      state.productLoading[productId] = loading;
    }
  },
  extraReducers: (builder) => {
    // Fetch wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the actual API response structure
        const response = action.payload;
        state.items = response.wishlist || [];
        state.summary = {
          totalItems: response.summary?.total_items || 0,
          totalValue: 0, // Calculate if needed
          highPriority: response.summary?.high_priority || 0,
          mediumPriority: response.summary?.medium_priority || 0,
          lowPriority: response.summary?.low_priority || 0,
          latestAdded: response.summary?.latest_added || null
        };
        state.pagination = response.pagination || {
          page: 1,
          limit: 10,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false
        };
        
        // Update wishlist status for all products
        state.items.forEach(item => {
          if (item.product_id?._id) {
            state.wishlistStatus[item.product_id._id] = true;
          }
        });
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to wishlist
    builder
      .addCase(addToWishlist.pending, (state, action) => {
        const productId = action.meta.arg.productId;
        state.productLoading[productId] = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const newItem = action.payload;
        const productId = action.meta.arg.productId;
        state.productLoading[productId] = false;
        // Check if item already exists
        const existingIndex = state.items.findIndex(
          item => item.product_id?._id === newItem.product_id?._id
        );
        if (existingIndex >= 0) {
          state.items[existingIndex] = newItem;
        } else {
          state.items.push(newItem);
        }
        state.summary.totalItems = state.items.length;
        // Update wishlist status
        if (newItem.product_id?._id) {
          state.wishlistStatus[newItem.product_id._id] = true;
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        const productId = action.meta.arg.productId;
        state.productLoading[productId] = false;
        state.error = action.payload;
      });

    // Remove from wishlist
    builder
      .addCase(removeFromWishlist.pending, (state, action) => {
        const productId = action.meta.arg;
        state.productLoading[productId] = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const productId = action.payload.productId;
        state.productLoading[productId] = false;
        state.items = state.items.filter(
          item => item.product_id?._id !== action.payload.productId
        );
        state.summary.totalItems = state.items.length;
        // Update wishlist status
        state.wishlistStatus[action.payload.productId] = false;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        const productId = action.meta.arg;
        state.productLoading[productId] = false;
        state.error = action.payload;
      });

    // Update wishlist item
    builder
      .addCase(updateWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          item => item.product_id?._id === updatedItem.product_id?._id
        );
        if (index >= 0) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(updateWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Check wishlist status
    builder
      .addCase(checkWishlistStatus.fulfilled, (state, action) => {
        const { productId, isInWishlist } = action.payload;
        state.wishlistStatus[productId] = isInWishlist;
      });

    // Clear wishlist
    builder
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.summary = {
          totalItems: 0,
          totalValue: 0,
          highPriority: 0,
          mediumPriority: 0,
          lowPriority: 0,
          latestAdded: null
        };
        state.pagination = {
          page: 1,
          limit: 10,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false
        };
        state.wishlistStatus = {};
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Move wishlist to cart
    builder
      .addCase(moveWishlistToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveWishlistToCart.fulfilled, (state) => {
        state.loading = false;
        // Clear wishlist after moving to cart
        state.items = [];
        state.summary = {
          totalItems: 0,
          totalValue: 0,
          highPriority: 0,
          mediumPriority: 0,
          lowPriority: 0,
          latestAdded: null
        };
        state.pagination = {
          page: 1,
          limit: 10,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false
        };
        state.wishlistStatus = {};
      })
      .addCase(moveWishlistToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, setWishlistStatus, clearWishlistStatus, setProductLoading } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.loading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectWishlistSummary = (state) => state.wishlist.summary;
export const selectWishlistPagination = (state) => state.wishlist.pagination;
export const selectWishlistStatus = (state) => state.wishlist.wishlistStatus;
export const selectProductLoading = (state) => state.wishlist.productLoading;
export const selectIsInWishlist = (state, productId) => state.wishlist.wishlistStatus[productId] || false;
export const selectIsProductLoading = (state, productId) => state.wishlist.productLoading[productId] || false;

export default wishlistSlice.reducer; 