import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import locationReducer from "./location/locationSlice";
import modalLocationReducer from "./modalLocation/modalLocationSlice"; 
import homeReducer from "./home/homeSlice";
import storesReducer from "./stores/storesSlice";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
// Vendor slices
import hotelsReducer from "./hotels/hotelsSlice";
import moviesReducer from "./movies/moviesSlice";
import eventsReducer from "./events/eventsSlice";
import buffetReducer from "./buffet/buffetSlice";

// Configure persistence for profile data only
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["profileData", "profileImage"], // Only persist profile data
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: persistedUserReducer,
      location: locationReducer,
      modalLocation: modalLocationReducer,
      home: homeReducer,
      stores: storesReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      // Vendor reducers
      hotels: hotelsReducer,
      movies: moviesReducer,
      events: eventsReducer,
      buffet: buffetReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

  return store;
};

export const persistor = persistStore(makeStore());
