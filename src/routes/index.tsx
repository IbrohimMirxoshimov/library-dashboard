import {lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Spin} from 'antd';

import {ROUTES} from '@constants/routes';
import {AppLayout, AuthLayout} from '@layouts';
import type {UserRole} from '@modules/user/types/user.type';
import localization from '@localization';
import type {ProtectedRouteType, PublicRouteType, UserRouteType} from '@ts-types/route.type';

const Dashboard = lazy(() => import('@pages/dashboard'));
const Rent = lazy(() => import('@pages/rent'));
const Reader = lazy(() => import('@pages/reader'));
const SignIn = lazy(() => import('@pages/auth/SignIn'));

const protectedRoutes: ProtectedRouteType[] = [
  {
    path: ROUTES.DASHBOARD,
    component: <Dashboard />,
    access: ['owner'],
  },
  {
    path: ROUTES.READER_LIST,
    component: <Reader />,
    access: ['owner'],
  },
  {
    path: ROUTES.RENT_LIST,
    component: <Rent />,
    access: ['owner'],
  },
  {path: '*', component: <Navigate to={ROUTES.DASHBOARD} />, access: ['owner']},
];

const publicRoutes: PublicRouteType[] = [
  {path: ROUTES.SIGN_IN, component: <SignIn />},
  {path: '*', component: <Navigate to={ROUTES.SIGN_IN} />},
];

export default function AppRoute({isAuthenticated, role}: {isAuthenticated: boolean; role: UserRole}) {
  const owner = protectedRoutes.filter(route => route.access.includes('owner'));
  const moderator = protectedRoutes.filter(route => route.access.includes('moderator'));
  const librarian = protectedRoutes.filter(route => route.access.includes('librarian'));

  const userRoute: UserRouteType = {
    owner,
    moderator,
    librarian,
    default: [],
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {isAuthenticated ? (
          <Route>
            {userRoute[(role as UserRole) || 'default'].map((route: ProtectedRouteType, idx: number) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Suspense fallback={<Spin spinning={true} size="large" tip={localization.t('loading') + '...'} />}>
                    <AppLayout>{route.component}</AppLayout>
                  </Suspense>
                }
              />
            ))}
          </Route>
        ) : (
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Suspense fallback={<Spin spinning={true} size="large" tip={localization.t('loading') + '...'} />}>
                    <AuthLayout>{route.component}</AuthLayout>
                  </Suspense>
                }
              />
            ))}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
