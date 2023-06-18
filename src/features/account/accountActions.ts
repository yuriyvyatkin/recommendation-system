import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = import.meta.env.VITE_API_URL;

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export const registerUser = createAsyncThunk(
  'account/registerUser',
  async (
    {
      firstName,
      email,
      password,
    }: { firstName: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config,
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const logInUser = createAsyncThunk(
  'account/logInUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        { email, password },
        config,
      );

      localStorage.setItem('userToken', data.userToken);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
