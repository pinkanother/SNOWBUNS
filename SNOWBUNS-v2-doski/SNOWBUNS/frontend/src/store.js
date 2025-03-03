import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import videoReducer from "./reducers/videoReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
