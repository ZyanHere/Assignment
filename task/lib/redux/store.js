import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import locationReducer from "./location/locationSlice";
import modalLocationReducer from "./modalLocation/modalLocationSlice"; 

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      location: locationReducer,
      modalLocation: modalLocationReducer, 
    },
  });
};
