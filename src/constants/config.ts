import localization from '@localization';

const {VITE_BASE_URL} = import.meta.env;

export const config = {
  APP_NAME: localization.t('app_name'),
  BASE_URL: VITE_BASE_URL,
  storage: {
    LANGUAGE: 'M-LANG',
    THEME: 'M-THEME',
    ACCESS_TOKEN: 'M-ACCESS-TOKEN',
    REFRESH_TOKEN: 'M-REFRESH-TOKEN',
    USER_ROLE: 'M-ROLE',
  },
};
