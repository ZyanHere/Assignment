import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import locationReducer from "./location/locationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      location: locationReducer
    }
  });
};