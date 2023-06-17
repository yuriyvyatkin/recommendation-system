import { faker } from '@faker-js/faker';

function shuffleName(name) {
  const letters = name.split('');
  const shuffledLetters = faker.helpers.shuffle(letters);
  const shuffledName = shuffledLetters.join('');
  return shuffledName;
}

export default function getRandomId() {
  const name = faker.name.firstName().toLowerCase();
  const shuffledName = shuffleName(name);
  const date = faker.date.past().getTime();
  const randomNumber = faker.datatype.number(9999);

  const id = `${shuffledName}_${date}_${randomNumber}`;
  return id;
}
