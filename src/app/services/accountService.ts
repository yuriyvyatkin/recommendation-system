import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Store = {
  account: {
    userToken: string;
  };
};

export const accountAPI = createApi({
  reducerPath: 'accountAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
      const store = getState() as Store;
      const token = store.account.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = accountAPI;
