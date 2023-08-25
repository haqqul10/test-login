import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./UserSlice";
import useTransaction from "./UserSlice";

const store = configureStore({
  reducer: { user: useReducer, transaction: useTransaction },
});

export default store;
