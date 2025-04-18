// redux/modalLocation/modalLocationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
};

const modalLocationSlice = createSlice({
  name: "modalLocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = modalLocationSlice.actions;
export default modalLocationSlice.reducer;
