import { createSlice } from '@reduxjs/toolkit';
import generateFakeTileData from "@/utils/generateFakeTileData";
import getRandomId from "@/utils/getRandomId";

type Item = {
  id: string,
  name: string,
  author: string,
  image: string,
  album: string,
  genre: string,
  year: string,
  file: {
    name: string,
    URL: string,
  },
  likesNumber: number,
};

const initialState: Array<Item> = generateFakeTileData(4);

const tileSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const { name, author, image, album, genre, year, file } = payload;
      state.push({ id: getRandomId(), name, author, image, album, genre, year, file, likesNumber: 0 });
    },
    addItemChanges(state, { payload }) {
      const { index, name, author, image, album, genre, year, file } = payload;
      state[index] = {
        id: state[index].id,
        name,
        author,
        image,
        album,
        genre,
        year,
        file,
        likesNumber: state[index].likesNumber,
      };
    },
    removeItem(state, { payload }) {
      const { id } = payload;
      const index = state.findIndex((item) => item.id === id);
      state.splice(index, 1);
    },
    addLikeToItem(state, { payload }) {
      const { id, liked } = payload;
      const index = state.findIndex((item) => item.id === id);

      if (liked) {
        state[index].likesNumber -= 1;
      } else {
        state[index].likesNumber += 1;
      }
    },
  },
});

export const {
  addItem,
  addItemChanges,
  removeItem,
  addLikeToItem
} = tileSlice.actions;

export default tileSlice.reducer;
