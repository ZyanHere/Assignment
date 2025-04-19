import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Signup
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Set user (on app load or after /me)
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  logout
} = userSlice.actions;

export default userSlice.reducer;
