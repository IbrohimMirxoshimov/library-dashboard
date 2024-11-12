import {localization} from '@localization';

const {VITE_BASE_URL} = import.meta.env;

export const config = {
  APP_NAME: localization.t('appName'),
  BASE_URL: VITE_BASE_URL,
};
