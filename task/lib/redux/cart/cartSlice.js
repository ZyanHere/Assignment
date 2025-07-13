import { createSlice } from '@reduxjs/toolkit';
import debounce from 'lodash.debounce';

const initialState = {
  items: [], // {id, name, price, quantity, ...}
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const updateTotals = (state) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      updateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      updateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      updateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      updateTotals(state);
    },
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      updateTotals(state);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Debounced update (for API sync or localStorage)
export const debouncedUpdateCart = debounce((dispatch, items) => {
  // Example: sync to localStorage or API
  localStorage.setItem('cart', JSON.stringify({ items }));
  // Optionally: dispatch an async thunk to sync with backend
}, 500);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer; 