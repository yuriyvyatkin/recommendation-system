import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  name: string[];
  author: string[];
  genre: string[];
  liked: boolean;
};

const initialState: InitialState = {
  name: [],
  author: [],
  genre: [],
  liked: false,
};

const FiltrationFormSlice = createSlice({
  name: 'filtrationForm',
  initialState,
  reducers: {
    changeMenus(state, { payload }) {
      return payload;
    },
    resetMenus(state) {
      return initialState;
    }
  },
});

export const {
  changeMenus,
  resetMenus
} = FiltrationFormSlice.actions;
export default FiltrationFormSlice.reducer;
