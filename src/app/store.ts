import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/features/account/accountSlice';
import { accountAPI } from './services/accountService';
import AdminFormSlice from '@/components/forms/adminForm/adminFormSlice';
import FiltrationForm from '@/components/forms/filtrationForm/filtrationFormSlice';
import searchBarSlice from '@/components/forms/searchBar/searchBarSlice';
import recommendationsSlice from '@/components/forms/recommendations/recommendationsSlice';
import tileSlice from '@/components/tile/tileSlice';
import signInFormSlice from '@/pages/loginPage/loginPageSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    adminForm: AdminFormSlice,
    search: searchBarSlice,
    filtrationForm: FiltrationForm,
    recommendations: recommendationsSlice,
    list: tileSlice,
    users: signInFormSlice,
    [accountAPI.reducerPath]: accountAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountAPI.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
