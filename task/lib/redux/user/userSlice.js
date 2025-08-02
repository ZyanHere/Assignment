import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API base URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// Helper function to get auth token from session
const getAuthHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

// Async thunks for profile operations
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile`, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ token, profileData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/auth/customer/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'user/uploadProfileImage',
  async ({ token, imageFile }, { rejectWithValue }) => {
    try {
      // Import the upload function here to avoid circular dependencies
      const { uploadProfilePhoto } = await import('@/lib/utils/profilePhotoUpload');
      const result = await uploadProfilePhoto(imageFile, token);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload profile image');
    }
  }
);

// Async thunks for address operations
export const fetchUserAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses`, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch addresses');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const createUserAddress = createAsyncThunk(
  'user/createAddress',
  async ({ token, addressData }, { rejectWithValue }) => {
    try {
          const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create address');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  'user/updateAddress',
  async ({ token, addressId, addressData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses/${addressId}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update address');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  'user/deleteAddress',
  async ({ token, addressId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses/${addressId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to delete address');
      }

      return addressId;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const setPrimaryAddress = createAsyncThunk(
  'user/setPrimaryAddress',
  async ({ token, addressId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses/${addressId}/primary`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to set primary address');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunks for order operations
export const fetchUserOrders = createAsyncThunk(
  'user/fetchOrders',
  async ({ token, params = {} }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${BACKEND_URL}/lmd/api/v1/retail/orders/me${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      return data.data?.orders || data.orders || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const createOrderFromCart = createAsyncThunk(
  'user/createOrderFromCart',
  async ({ token, orderData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/create-from-cart`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const createOrderFromSingleItem = createAsyncThunk(
  'user/createOrderFromSingleItem',
  async ({ token, orderData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/single-item`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'user/getOrderDetails',
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/${orderId}`, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch order details');
      }

      const data = await response.json();
      return data; // Return the entire response, not just data.data
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'user/cancelOrder',
  async ({ token, orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to cancel order');
      }

      const data = await response.json();
      return { orderId, ...data.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunks for order tracking operations
export const fetchOrderTracking = createAsyncThunk(
  'user/fetchOrderTracking',
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/${orderId}/track`, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch order tracking');
      }

      const data = await response.json();
      return { orderId, trackingData: data.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const refreshOrderTracking = createAsyncThunk(
  'user/refreshOrderTracking',
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/${orderId}/track`, {
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to refresh order tracking');
      }

      const data = await response.json();
      return { orderId, trackingData: data.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState = {
  // Profile data
  profileData: null,
  profileImage: null,
  
  // Address data
  addresses: [],
  primaryAddress: null,
  
  // Order data
  orders: [],
  currentOrder: null,
  
  // Tracking data
  orderTracking: {},
  
  // Loading states
  loading: false,
  profileLoading: false,
  addressLoading: false,
  imageUploading: false,
  ordersLoading: false,
  orderCreating: false,
  orderCancelling: false,
  trackingLoading: false,
  
  // Error states
  error: null,
  profileError: null,
  addressError: null,
  ordersError: null,
  trackingError: null,
  
  // Cache timestamps for avoiding redundant calls
  lastFetchTime: null,
  lastAddressFetchTime: null,
  lastOrdersFetchTime: null,
  lastTrackingFetchTime: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Manual profile data management (for session sync)
    setProfileData: (state, action) => {
      console.log('Redux setProfileData called with payload:', action.payload);
      state.profileData = action.payload;
      state.profileError = null;
      state.lastFetchTime = Date.now();
      
      // Update profile image if provided
      const profileImage = action.payload?.profileImage;
      if (profileImage) {
        state.profileImage = profileImage;
      }
    },

    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
      if (state.profileData) {
        state.profileData.profileImage = action.payload;
      }
    },

    updateProfileData: (state, action) => {
      if (state.profileData) {
        state.profileData = { ...state.profileData, ...action.payload };
      }
    },

    // Clear all data
    clearProfileData: (state) => {
      return initialState;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.profileError = null;
      state.addressError = null;
    },

    // Manual address management (for immediate UI updates)
    setAddresses: (state, action) => {
      state.addresses = action.payload;
      state.primaryAddress = action.payload.find(addr => addr.isDefault) || action.payload[0] || null;
      state.lastAddressFetchTime = Date.now();
    },

    // Manual order management (for immediate UI updates)
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.lastOrdersFetchTime = Date.now();
    },

    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // Add new order to the beginning
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order._id === orderId || order.order_id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
      // Update current order if it matches
      if (state.currentOrder && (state.currentOrder._id === orderId || state.currentOrder.order_id === orderId)) {
        state.currentOrder.status = status;
      }
    },

    // Manual tracking management (for immediate UI updates)
    setOrderTracking: (state, action) => {
      const { orderId, trackingData } = action.payload;
      state.orderTracking[orderId] = trackingData;
      state.lastTrackingFetchTime = Date.now();
    },

    clearOrderTracking: (state, action) => {
      const orderId = action.payload;
      delete state.orderTracking[orderId];
    },

    clearAllTracking: (state) => {
      state.orderTracking = {};
      state.trackingError = null;
    },

    updateTrackingError: (state, action) => {
      state.trackingError = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Profile fetch
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileData = action.payload;
        state.lastFetchTime = Date.now();
        
        // Update profile image if present
        if (action.payload?.profileImage) {
          state.profileImage = action.payload.profileImage;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    // Profile update
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileData = { ...state.profileData, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    // Profile image upload
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.imageUploading = true;
        state.profileError = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.imageUploading = false;
        state.profileImage = action.payload.profileImage;
        
        // Update profile data if user data is included
        if (action.payload.userData) {
          state.profileData = { ...state.profileData, ...action.payload.userData };
        } else if (state.profileData) {
          state.profileData.profileImage = action.payload.profileImage;
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.imageUploading = false;
        state.profileError = action.payload;
      });

    // Address fetch
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addresses = action.payload;
        state.primaryAddress = action.payload.find(addr => addr.isDefault) || action.payload[0] || null;
        state.lastAddressFetchTime = Date.now();
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Address create
    builder
      .addCase(createUserAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(createUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addresses.push(action.payload);
        
        // Set as primary if it's the only address or explicitly set as primary
        if (state.addresses.length === 1 || action.payload.isDefault) {
          state.primaryAddress = action.payload;
        }
      })
      .addCase(createUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Address update
    builder
      .addCase(updateUserAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        const index = state.addresses.findIndex(addr => addr._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        
        // Update primary address if this was the primary one
        if (action.payload.isDefault) {
          state.primaryAddress = action.payload;
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Address delete
    builder
      .addCase(deleteUserAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
        
        // Update primary address if the deleted address was primary
        if (state.primaryAddress?._id === action.payload) {
          state.primaryAddress = state.addresses[0] || null;
        }
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Set primary address
    builder
      .addCase(setPrimaryAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(setPrimaryAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        
        // Update all addresses to reflect the new primary status
        state.addresses = state.addresses.map(addr => ({
          ...addr,
          isDefault: addr._id === action.payload._id
        }));
        
        state.primaryAddress = action.payload;
      })
      .addCase(setPrimaryAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Orders fetch
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
        state.lastOrdersFetchTime = Date.now();
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });

    // Order creation from cart
    builder
      .addCase(createOrderFromCart.pending, (state) => {
        state.orderCreating = true;
        state.ordersError = null;
      })
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.orderCreating = false;
        state.currentOrder = action.payload;
        // Add to orders list if it's not already there
        const existingOrder = state.orders.find(order => 
          order._id === action.payload._id || order.order_id === action.payload.order_id
        );
        if (!existingOrder) {
          state.orders.unshift(action.payload);
        }
      })
      .addCase(createOrderFromCart.rejected, (state, action) => {
        state.orderCreating = false;
        state.ordersError = action.payload;
      });

    // Order creation from single item
    builder
      .addCase(createOrderFromSingleItem.pending, (state) => {
        state.orderCreating = true;
        state.ordersError = null;
      })
      .addCase(createOrderFromSingleItem.fulfilled, (state, action) => {
        state.orderCreating = false;
        state.currentOrder = action.payload;
        // Add to orders list if it's not already there
        const existingOrder = state.orders.find(order => 
          order._id === action.payload._id || order.order_id === action.payload.order_id
        );
        if (!existingOrder) {
          state.orders.unshift(action.payload);
        }
      })
      .addCase(createOrderFromSingleItem.rejected, (state, action) => {
        state.orderCreating = false;
        state.ordersError = action.payload;
      });

    // Order details fetch
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.ordersLoading = false;
        
        // Handle the response structure: { status, data: { order, orderItems, payments } }
        const responseData = action.payload;
        let orderData;
        
        if (responseData.data && responseData.data.order) {
          // Combine order with items and payments
          orderData = {
            ...responseData.data.order,
            items: responseData.data.orderItems || [],
            payments: responseData.data.payments || []
          };
        } else {
          // Fallback to direct data
          orderData = responseData;
        }
        
        state.currentOrder = orderData;
        
        // Update the order in the orders list if it exists
        const orderIndex = state.orders.findIndex(order => 
          order._id === orderData._id || order.order_id === orderData.order_id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = orderData;
        }
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });

    // Order cancellation
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.orderCancelling = true;
        state.ordersError = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orderCancelling = false;
        
        const { orderId } = action.payload;
        
        // Update order status in orders list
        const orderIndex = state.orders.findIndex(order => 
          order._id === orderId || order.order_id === orderId
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = { ...state.orders[orderIndex], ...action.payload, status: 'cancelled' };
        }
        
        // Update current order if it matches
        if (state.currentOrder && (state.currentOrder._id === orderId || state.currentOrder.order_id === orderId)) {
          state.currentOrder = { ...state.currentOrder, ...action.payload, status: 'cancelled' };
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.orderCancelling = false;
        state.ordersError = action.payload;
      });

    // Order tracking fetch
    builder
      .addCase(fetchOrderTracking.pending, (state) => {
        state.trackingLoading = true;
        state.trackingError = null;
      })
      .addCase(fetchOrderTracking.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.orderTracking[action.payload.orderId] = action.payload.trackingData;
        state.lastTrackingFetchTime = Date.now();
      })
      .addCase(fetchOrderTracking.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingError = action.payload;
      });

    // Order tracking refresh
    builder
      .addCase(refreshOrderTracking.pending, (state) => {
        state.trackingLoading = true;
        state.trackingError = null;
      })
      .addCase(refreshOrderTracking.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.orderTracking[action.payload.orderId] = action.payload.trackingData;
        state.lastTrackingFetchTime = Date.now();
      })
      .addCase(refreshOrderTracking.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingError = action.payload;
      });
  }
});

export const {
  setProfileData,
  updateProfileImage,
  updateProfileData,
  clearProfileData,
  clearErrors,
  setAddresses,
  setOrders,
  setCurrentOrder,
  addOrder,
  updateOrderStatus,
  setOrderTracking,
  clearOrderTracking,
  clearAllTracking,
  updateTrackingError,
} = userSlice.actions;

export default userSlice.reducer;
