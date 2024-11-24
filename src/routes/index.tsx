import {lazy} from 'react';
import {Navigate} from 'react-router-dom';

import type {ProtectedRouteType, PublicRouteType} from '@ts-types/route.type';
import {ROUTES} from '@constants/routes';

const Dashboard = lazy(() => import('@pages/dashboard'));
const Rent = lazy(() => import('@pages/rent'));
const Reader = lazy(() => import('@pages/reader'));
const SignIn = lazy(() => import('@pages/auth/sign-in.page'));

export const protectedRoutes: ProtectedRouteType[] = [
  {
    path: ROUTES.DASHBOARD,
    component: <Dashboard />,
    access: ['owner', 'moderator', 'librarian'],
  },
  {
    path: ROUTES.READER_LIST,
    component: <Reader />,
    access: ['owner', 'moderator', 'librarian'],
  },
  {
    path: ROUTES.RENT_LIST,
    component: <Rent />,
    access: ['owner', 'moderator', 'librarian'],
  },
  {path: '*', component: <Navigate to={ROUTES.DASHBOARD} />, access: ['owner', 'moderator', 'librarian']},
];

export const publicRoutes: PublicRouteType[] = [
  {path: ROUTES.SIGN_IN, component: <SignIn />},
  {path: '*', component: <Navigate to={ROUTES.SIGN_IN} />},
];
