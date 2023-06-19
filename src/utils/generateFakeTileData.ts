import { faker } from '@faker-js/faker/locale/ru';
import getCapitalizedWord from './getCapitalizedWord';
import getRandomId from './getRandomId';
import getRandomYear from './getRandomYear';
import getRandomNoun from './getRandomNoun';

export default function generateFakeTileData(itemsNumber: number) {
  const result = [];

  for (let i = 0; i < itemsNumber; i++) {
    result.push({
      id: getRandomId(),
      name: getCapitalizedWord(getRandomNoun(['a', 'я'])),
      author: faker.name.fullName(),
      image: `https://picsum.photos/300/200?random=${i}`,
      album: faker.lorem.sentence(3),
      genre: getCapitalizedWord(getRandomNoun(['ие'])),
      year: getRandomYear(2000, 2019),
      file: {
        name: name + '.txt',
        URL: '',
      },
      likesNumber: faker.datatype.number(10),
    });
  }

  return result;
}
