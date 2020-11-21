import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import expenseReducer from '../features/expense/expenseSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export default configureStore({
  reducer: {
    expense: expenseReducer,
    categories: categoriesReducer
  },
});
