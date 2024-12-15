export const ROUTES = {
  DASHBOARD: '/dashboard',

  // ----- USERS -----
  USER_LIST: '/users',
  USER_CREATE: '/users/create',
  USER_UPDATE: '/users/:id/update',

  // ----- READERS -----
  READER_LIST: '/readers',
  READER_CREATE: '/readers/create',
  READER_UPDATE: 'readers/:id/update',

  // ----- RENTS -----
  RENT_LIST: '/rents',
  RENT_CREATE: '/rents/create',
  RENT_UPDATE: '/rents/:id/update',

  //auth
  SIGN_IN: '/auth/sign-in',
} as const;
