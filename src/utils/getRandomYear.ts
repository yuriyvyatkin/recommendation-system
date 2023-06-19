import { faker } from '@faker-js/faker';

export default function getRandomYear(min, max) {
  const year = faker.datatype.number({ min: min, max: max });
  return String(year);
}
