const RANDOM_STRING_LENGTH = 36;
const RANDOM_STRING_CUT_INDEX = -8;

export function clearString(str: string) {
  return str
    .replace(/(\D)\.|(\D),/g, '$1')
    .replace(/\n|\r/g, '')
    .replace(/ +(?= )/g, '')
    .trim();
}

export const randomString = () => Math.random().toString(RANDOM_STRING_LENGTH).slice(RANDOM_STRING_CUT_INDEX);
