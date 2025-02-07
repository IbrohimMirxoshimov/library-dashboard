import localization from '@localization';

const {VITE_BASE_URL} = import.meta.env;

export const config = {
  APP_NAME: localization.t('app_name'),
  BASE_URL: VITE_BASE_URL,
  storage: {
    LANGUAGE: 'M-LNG',
    THEME: 'M-THM',
    ACCESS_TOKEN: 'M-ACT',
    REFRESH_TOKEN: 'M-RFT',
    PERMISSION: 'M-PRN',
  },
  defaultPageSize: 10,
  pageSizeOptions: ['10', '50', '100'],
};
