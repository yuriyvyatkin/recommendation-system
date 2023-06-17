import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInUser } from './accountActions';

const userToken = localStorage.getItem('userToken');
const isUserToken = Boolean(userToken);

type UserInfo = {
  id: string;
  firstName: string;
  email: string;
  password: string;
};

type InitialState = {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  error: string | null;
  registered: boolean;
  authorized: boolean;
};

const initialState: InitialState = {
  loading: false,
  userInfo: null,
  userToken: isUserToken ? userToken : null,
  error: null,
  registered: isUserToken,
  authorized: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');

      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.registered = false;
      state.authorized = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.authorized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
        state.authorized = true;
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as keyof typeof payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as keyof typeof payload;
      });
  },
});

export const { logout, setCredentials } = accountSlice.actions;
export default accountSlice.reducer;
