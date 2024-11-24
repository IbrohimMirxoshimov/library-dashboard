import {AnyJson} from '@ts-types/any.type';

const localstorage = {
  get: (key: string) => (window.localStorage && window.localStorage.getItem(key)) || null,

  set: (key: string, value: AnyJson) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return;
    } else if (typeof value === 'object' && Object.keys(value).length === 0) {
      return;
    } else if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
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
