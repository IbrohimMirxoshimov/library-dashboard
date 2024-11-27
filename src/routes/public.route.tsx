import {Navigate} from 'react-router-dom';

import PAGES from '@pages';
import {ROUTES} from '@constants';
import type {IPublicRoute} from '@ts-types/route.type';

export const publicRoutes: IPublicRoute[] = [
  {path: ROUTES.SIGN_IN, component: <PAGES.SignIn />},
  {path: '*', component: <Navigate to={ROUTES.SIGN_IN} />},
];
