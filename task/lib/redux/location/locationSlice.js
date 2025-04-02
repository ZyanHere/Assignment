import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coordinates: null,
  address: '',
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    setAutoLocationSuccess(state, action) {
      state.coordinates = action.payload.coordinates;
      state.address = action.payload.address;
      state.loading = false;
    },
    setManualLocationSuccess(state, action) {
      state.address = action.payload;
      state.loading = false;
    },
    setLocationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  setLocationStart,
  setAutoLocationSuccess,
  setManualLocationSuccess,
  setLocationFailure
} = locationSlice.actions;

export default locationSlice.reducer;