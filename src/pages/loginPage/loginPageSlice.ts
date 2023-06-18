import getRandomId from "@/utils/getRandomId";
import { createSlice } from '@reduxjs/toolkit';
// import { hashPassword } from "hashed-password";

type User = {
  id: string,
  name: string,
  gender: string,
  age: number,
  email: string,
  // password: {
  //   salt: string;
  //   hash: string;
  // },
  password: string,
  likedItems: Array<string>,
  role: string;
};

const initialState: Array<User> = [
  {
    id: getRandomId(),
    name: 'John',
    gender: 'male',
    age: 32,
    email: 'john@mail.com',
    // password: {
    //   hash: '183e93b815f6b1c73dd0d321745c7086d0e6cf5853fef39492c6f388c145b39e01f1496e7d2b41cef196e0bcf24735fa2f50ee19a176aad855d2d0968d43d59b',
    //   salt: 'f88fad545c2058c5e5b9e6492f1fac05'
    // }, // password: 123123Aa
    password: '123123Aa',
    likedItems: [],
    role: 'admin',
  },
  {
    id: getRandomId(),
    name: 'Mike',
    gender: 'male',
    age: 23,
    email: 'mike@mail.com',
    // password: {
    //   hash: '183e93b815f6b1c73dd0d321745c7086d0e6cf5853fef39492c6f388c145b39e01f1496e7d2b41cef196e0bcf24735fa2f50ee19a176aad855d2d0968d43d59b',
    //   salt: 'f88fad545c2058c5e5b9e6492f1fac05'
    // }, // password: 123123Aa
    password: '123123Aa',
    likedItems: [],
    role: 'user',
  }
];

const loginPageSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      const { name, email, gender, age, password } = payload;
      // const {hash, salt} = hashPassword(password);

      state.push({
        id: getRandomId(),
        name,
        gender,
        age,
        email,
        // password: { hash, salt },
        password: password,
        likedItems: [],
        role: 'user',
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
        role: 'user',
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
} = loginPageSlice.actions;
export default loginPageSlice.reducer;
