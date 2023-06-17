import { faker } from '@faker-js/faker';
import getCapitalizedWord from "./getCapitalizedWord";
import getRandomId from "./getRandomId";

function getRandomYear(min, max) {
  const year = faker.datatype.number({ min: min, max: max });
  return String(year);
}

export default function generateFakeTileData(itemsNumber: number) {
  const result = [];

  for (let i = 0; i < itemsNumber; i++) {
    const name = faker.lorem.word();
    result.push({
      id: getRandomId(),
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

  return result;
}
