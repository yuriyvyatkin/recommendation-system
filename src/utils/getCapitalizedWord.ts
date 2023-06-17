export default function getCapitalizedWord(word: string | undefined) {
  if (word) {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  } else {
    return '';
  }
}
