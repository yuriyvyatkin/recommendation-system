import { faker } from '@faker-js/faker/locale/ru';

export default function getRandomNoun(endings: string[]): string {
  let noun = '';

  while (!noun) {
    const word = faker.random.word();

    if (/[a-z]/i.test(word)) {
      continue;
    }

    endings.forEach((ending) => {
      if (word.endsWith(ending)) {
        noun = word;
      }
    });
  }

  return noun;
}
