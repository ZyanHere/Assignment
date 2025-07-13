import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_DURATION;
};

// Async thunk for fetching comprehensive home data (categories + products) in one call
export const fetchComprehensiveHomeData = createAsyncThunk(
  'home/fetchComprehensiveHomeData',
  async (_, { rejectWithValue, getState }) => {
    // Check if data is already loaded and cache is still valid
    const state = getState();
    const hasData = state.home.categories.length > 0 && state.home.allProducts.length > 0;
    const cacheValid = isCacheValid(state.home.lastFetched);
    
    if (hasData && cacheValid && !state.home.homeDataLoading) {
      console.log('Home data cache is valid, skipping API call');
      return {
        categories: state.home.categories,
        allProducts: state.home.allProducts,
        productsByCategory: state.home.productsByCategory,
        fromCache: true
      };
    }

    // If cache is expired or no data, fetch fresh data
    if (hasData && !cacheValid) {
      console.log('Home data cache expired, fetching fresh data...');
    } else if (!hasData) {
      console.log('No home data available, fetching initial data...');
    }

    try {
      console.log('Fetching comprehensive home data from API...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/home/comprehensive?productsLimit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch home data');
      }

      const data = await response.json();
      console.log('Comprehensive home data fetched successfully:', {
        categories: data.data?.categories?.length || 0,
        allProducts: data.data?.allProducts?.length || 0,
        categoriesWithProducts: Object.keys(data.data?.productsByCategory || {}).length,
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching comprehensive home data:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Legacy async thunk for fetching categories (kept for backward compatibility)
export const fetchCategories = createAsyncThunk(
  'home/fetchCategories',
  async (_, { rejectWithValue, getState }) => {
    // Check if categories are already loaded to prevent unnecessary API calls
    const state = getState();
    if (state.home.categories.length > 0 && !state.home.categoriesLoading) {
      return state.home.categories;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/categories`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch categories');
      }

      const data = await response.json();
      return data.data || data; // Return data.data if it exists, otherwise return data
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Legacy async thunk for fetching products by category (kept for backward compatibility)
export const fetchProductsByCategory = createAsyncThunk(
  'home/fetchProductsByCategory',
  async (categoryId, { rejectWithValue, getState }) => {
    // Check if products for this category are already loaded
    const state = getState();
    if (state.home.productsByCategory[categoryId] && !state.home.productsLoading[categoryId]) {
      return { categoryId, products: state.home.productsByCategory[categoryId] };
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products?category=${categoryId}&limit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch products');
      }

      const data = await response.json();
      return { 
        categoryId, 
        products: data.data || data.products || [] 
      };
    } catch (error) {
      console.error(`Error fetching products for ${categoryId}:`, error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Legacy async thunk for fetching all products (kept for backward compatibility)
export const fetchAllProducts = createAsyncThunk(
  'home/fetchAllProducts',
  async (_, { rejectWithValue, getState }) => {
    // Check if all products are already loaded
    const state = getState();
    if (state.home.allProducts.length > 0 && !state.home.allProductsLoading) {
      return state.home.allProducts;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products?limit=20`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch all products');
      }

      const data = await response.json();
      return data.data || data.products || [];
    } catch (error) {
      console.error('Error fetching all products:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  selectedTab: "all",
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  isMobile: false,
  needsScrolling: false,
  // Product-related state
  allProducts: [],
  allProductsLoading: false,
  allProductsError: null,
  productsByCategory: {},
  productsLoading: {},
  productsError: {},
  // Comprehensive home data state
  homeDataLoading: false,
  homeDataError: null,
  lastFetched: null, // Timestamp of last successful fetch
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setNeedsScrolling: (state, action) => {
      state.needsScrolling = action.payload;
    },
    resetHomeState: (state) => {
      state.selectedTab = "all";
      state.categoriesError = null;
    },
    clearHomeCache: (state) => {
      state.lastFetched = null;
      console.log('Home cache cleared');
    },
  },
  extraReducers: (builder) => {
    builder
      // Comprehensive Home Data
      .addCase(fetchComprehensiveHomeData.pending, (state) => {
        state.homeDataLoading = true;
        state.homeDataError = null;
        state.categoriesLoading = true;
        state.allProductsLoading = true;
      })
      .addCase(fetchComprehensiveHomeData.fulfilled, (state, action) => {
        state.homeDataLoading = false;
        state.categoriesLoading = false;
        state.allProductsLoading = false;
        
        // Only update data if it's not from cache
        if (!action.payload.fromCache) {
          state.categories = action.payload.categories || [];
          state.allProducts = action.payload.allProducts || [];
          state.productsByCategory = action.payload.productsByCategory || {};
          state.lastFetched = Date.now(); // Update timestamp only for fresh data
        }
      })
      .addCase(fetchComprehensiveHomeData.rejected, (state, action) => {
        state.homeDataLoading = false;
        state.categoriesLoading = false;
        state.allProductsLoading = false;
        state.homeDataError = action.payload;
        state.categoriesError = action.payload;
        state.allProductsError = action.payload;
      })
      // Legacy Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      })
      // Legacy All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.allProductsLoading = true;
        state.allProductsError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProductsLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProductsLoading = false;
        state.allProductsError = action.payload;
      })
      // Legacy Products by Category
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const categoryId = action.meta.arg;
        state.productsLoading[categoryId] = true;
        state.productsError[categoryId] = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload;
        state.productsLoading[categoryId] = false;
        state.productsByCategory[categoryId] = products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const categoryId = action.meta.arg;
        state.productsLoading[categoryId] = false;
        state.productsError[categoryId] = action.payload;
      });
  },
});

export const { 
  setSelectedTab, 
  setIsMobile, 
  setNeedsScrolling, 
  resetHomeState,
  clearHomeCache
} = homeSlice.actions;

export default homeSlice.reducer; 