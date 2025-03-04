import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./slices/projectSlice";
import { apiSlice } from "./slices/projectApiSlice";

export const store = configureStore({
  reducer: {
    project: projectSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
