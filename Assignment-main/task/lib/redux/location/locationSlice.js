import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coordinates: null,
  address: '',  // full address
  city: '',     // extracted city/town/village name
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
      state.address = action.payload.address; // full address
      state.city = action.payload.city;       // city/town name
      state.loading = false;
      state.error = null;
    },
    setManualLocationSuccess(state, action) {
      state.address = action.payload.address;
      state.city = action.payload.city || ''; // in case manual input includes city
      state.coordinates = action.payload.coordinates || null;
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
