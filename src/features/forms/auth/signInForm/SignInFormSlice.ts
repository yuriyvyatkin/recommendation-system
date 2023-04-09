import { nanoid } from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { hashPassword } from "hashed-password";

type User = {
  id: string,
  name: string,
  gender?: string,
  age?: number,
  email: string,
  password: string,
  likedItems: Array<string>,
};

const initialState: Array<User> = [
  {
    id: nanoid(),
    name: 'Mike',
    gender: 'male',
    age: 23,
    email: 'mike@mail.com',
    password: 'password123',
    likedItems: [],
  }
];

const signInSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      const { name, email, gender, age, password } = payload;
      const {hash, salt} = hashPassword(password);
      console.log(hash)
      console.log(salt)
      state.push({
        id: nanoid(),
        name,
        gender,
        age,
        email,
        password: password,
        likedItems: [],
      });
    },
    updateUserProfileInfo(state, { payload }) {
      const { userId, name, gender, age } = payload;
      const index = state.findIndex((user) => user.id === userId);
      state[index] = {
        id: state[index].id,
        name: name,
        gender: gender,
        age: age,
        email: state[index].email,
        password: state[index].password,
        likedItems: state[index].likedItems,
      };
    },
    addLikedItem(state, { payload }) {
      const { userId, itemId } = payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      state[userIndex].likedItems.push(itemId);
    },
    removeLikedItem(state, { payload }) {
      const { userId, itemId } = payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      const itemIndex = state[userIndex].likedItems.findIndex((item) => item === itemId);
      state[userIndex].likedItems.splice(itemIndex, 1);
    },
    changePassword(state, { payload }) {
      const { userId, password } = payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      state[userIndex].password = password;
    },
  },
});

export const {
  addUser,
  updateUserProfileInfo,
  addLikedItem,
  removeLikedItem,
  changePassword,
} = signInSlice.actions;
export default signInSlice.reducer;
