import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  name: string;
  author: string;
  image: string;
  album: string;
  genre: string;
  year: string;
  file: {
    name: string,
    URL: string,
  },
  editingMode: {
    state: boolean;
    index: string;
  };
};

type AccessState = {
  keyName: keyof InitialState;
}

const initialState: InitialState = {
  name: '',
  author: '',
  image: '',
  album: '',
  genre: '',
  year: '',
  file: {
    name: '',
    URL: '',
  },
  editingMode: {
    state: false,
    index: '',
  },
};

const AdminFormSlice = createSlice({
  name: 'adminForm',
  initialState,
  reducers: {
    changeItemField(state, { payload }) {
      const { name, value } = payload;

      const obj: AccessState = {
        keyName: name,
      };

      state[obj.keyName] = value;
    },
    editItem(state, { payload }) {
      return payload;
    },
    completeOperation(state) {
      return initialState;
    },
  },
});

export const {
  changeItemField,
  editItem,
  completeOperation
} = AdminFormSlice.actions;
export default AdminFormSlice.reducer;
