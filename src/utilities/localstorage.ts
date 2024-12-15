import {AnyArray, AnyJson, Primitives} from '@ts-types/any.type';

const localstorage = {
  get: (key: string) => (window.localStorage && window.localStorage.getItem(key)) || null,

  set: (key: string, value: AnyJson | Primitives | AnyArray) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return;
    } else if (typeof value === 'object' && Object.keys(value).length === 0) {
      return;
    } else if (window.localStorage) {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      window.localStorage.setItem(key, value);
      return;
    }
  },

  remove: (key: string) => {
    if (window.localStorage && window.localStorage[key]) {
      window.localStorage.removeItem(key);
      return true;
    }
  },
};

export default localstorage;
