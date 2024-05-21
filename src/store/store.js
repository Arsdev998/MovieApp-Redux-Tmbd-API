import { configureStore } from "@reduxjs/toolkit";
import movioReducer from "./movioSlice";

export const store = configureStore({
  reducer: {
    movioData: movioReducer,
  },
});
