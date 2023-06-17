import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  query: string;
};

type AccessState = {
  keyName: keyof InitialState;
}

const initialState = {
  query: '',
};

const searchBarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchField(state, { payload }) {
      const { name, value } = payload;

      const obj: AccessState = {
        keyName: name,
      };

      state[obj.keyName] = value;
    },
  },
});

export const {
  changeSearchField,
} = searchBarSlice.actions;
export default searchBarSlice.reducer;
