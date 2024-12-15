import {lazy} from 'react';

export default {
  Dashboard: lazy(() => import('@pages/dashboard')),
  Rent: {
    List: lazy(() => import('@pages/rent/rent.list')),
    Create: lazy(() => import('@pages/rent/rent.create')),
  },
  Reader: {
    List: lazy(() => import('@pages/reader/reader.list')),
    Create: lazy(() => import('@pages/reader/reader.create')),
  },
  SignIn: lazy(() => import('@pages/auth/sign-in.page')),
};
