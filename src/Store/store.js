import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import expenseReducer from "./ExpenceSlice"
import themeReducer from "./ThemeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
  }
});

export default store;
