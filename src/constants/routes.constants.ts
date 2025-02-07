import {ENTITY} from '@modules/entity/entity.type';

export const ROUTES = {
  DASHBOARD: '/',
  USER_LIST: '/' + ENTITY.USER + '/list',
  RENT_LIST: '/' + ENTITY.RENT + '/list',
  AUTHOR_LIST: '/' + ENTITY.AUTHOR + '/list',

  //auth
  SIGN_IN: '/auth/sign-in',
} as const;
