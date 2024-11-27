import {lazy} from 'react';

export default {
  Dashboard: lazy(() => import('@pages/dashboard')),
  Rent: lazy(() => import('@pages/rent')),
  Reader: lazy(() => import('@pages/reader')),
  SignIn: lazy(() => import('@pages/auth/sign-in.page')),
};
