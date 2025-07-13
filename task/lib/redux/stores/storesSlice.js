import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://lmd-user-2ky8.onrender.com";

export const fetchVendors = createAsyncThunk(
  "stores/fetchVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/vendor/public`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch vendors");
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchVendorProducts = createAsyncThunk(
  "stores/fetchVendorProducts",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/vendor/public/${vendorId}/products`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch vendor products");
      }
      const data = await response.json();
      return { vendorId, products: data.data || [] };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  vendors: [],
  vendorsLoading: false,
  vendorsError: null,
  productsByVendor: {},
  productsLoading: {},
  productsError: {},
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.vendorsLoading = true;
        state.vendorsError = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendorsLoading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.vendorsLoading = false;
        state.vendorsError = action.payload;
      })
      .addCase(fetchVendorProducts.pending, (state, action) => {
        const vendorId = action.meta.arg;
        state.productsLoading[vendorId] = true;
        state.productsError[vendorId] = null;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        const { vendorId, products } = action.payload;
        state.productsLoading[vendorId] = false;
        state.productsByVendor[vendorId] = products;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        const vendorId = action.meta.arg;
        state.productsLoading[vendorId] = false;
        state.productsError[vendorId] = action.payload;
      });
  },
});

export default storesSlice.reducer; 