import {AnyArray, AnyJson} from '@ts-types/any.type';

export function isEmptyObject(obj: AnyJson) {
  return JSON.stringify(obj) === JSON.stringify({});
}

export function divideArray(array: AnyArray) {
  const ARRAY_HALF = 2;
  const half = Math.round(array.length / ARRAY_HALF);
  return [array.slice(0, half), array.slice(half)];
}

export function groupBy(list: AnyJson[], keyGetter: (item: AnyJson) => string) {
  const map = new Map();
  list?.forEach((item: AnyJson) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function isObject(object: AnyJson) {
  return object != null && typeof object === 'object';
}

export function mergeSame(array: AnyArray) {
  return Array.from(new Set(array));
}

export function notIncludeId(id: string, list: AnyJson[]) {
  return !list.find((item: AnyJson) => item && item?.id === id);
}

export function removeDuplicates(list: AnyArray) {
  return Array.from(new Set(list));
}

export function clearArrayNulls(list: AnyArray) {
  return list.filter(e => e);
}

export function convertToNumber(list: string[]) {
  return list.map(item => {
    if (typeof item === 'string') {
      return Number(item);
    }

    return item;
  });
}

export function clearNullishKeysFromObject(object: AnyJson) {
  Object.keys(object).forEach(key => {
    if (object[key] === null) {
      delete object[key];
    }
  });

  return object;
}
