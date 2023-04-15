import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';
import getCapitalizedWord from '../helpers/getCapitalizedWord';

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

const initialState: Array<Item> = [];

function getRandomYear(min: number, max: number): string {
  return String(Math.trunc(Math.random() * (max - min) + min));
}

for (let i = 0; i < 4; i++) {
  const name = faker.lorem.word();
  initialState.push({
    id: nanoid(),
    name: getCapitalizedWord(name),
    author: faker.name.fullName(),
    image: `https://picsum.photos/300/200?random=${i}`,
    album: faker.music.songName(),
    genre: getCapitalizedWord(faker.lorem.word()),
    year: getRandomYear(2000, 2019),
    file: {
      name: name + '.txt',
      URL: '',
    },
    likesNumber: faker.datatype.number(10),
  });
};

const tileSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const { name, author, image, album, genre, year, file } = payload;
      state.push({ id: nanoid(), name, author, image, album, genre, year, file, likesNumber: 0 });
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
