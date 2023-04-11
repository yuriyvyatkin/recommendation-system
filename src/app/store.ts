import { configureStore } from '@reduxjs/toolkit';
import AdminFormSlice from '../features/forms/adminForm/adminFormSlice';
import FiltrationForm from '../features/forms/filtrationForm/filtrationFormSlice';
import searchBarSlice from '../features/forms/searchBar/searchBarSlice';
import recommendationsSlice from '../features/forms/recommendations/recommendationsSlice';
import tileSlice from '../features/tile/tileSlice';
import signInFormSlice from '../features/forms/auth/signInForm/signInFormSlice';

const reducer = {
  adminForm: AdminFormSlice,
  search: searchBarSlice,
  filtrationForm: FiltrationForm,
  recommendations: recommendationsSlice,
  list: tileSlice,
  users: signInFormSlice,
};

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
