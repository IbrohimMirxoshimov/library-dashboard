import {lazy} from 'react';

export default {
  Dashboard: lazy(() => import('@pages/dashboard')),
  SignIn: lazy(() => import('@pages/auth/sign-in.page')),
};
