import {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Spin} from 'antd';

import {appConfig} from '@constants';
import {useAppSelector} from '@store';
import {protectedRoutes, publicRoutes} from '@routes';
import {AppLayout, AuthLayout} from '@layouts';
import localstorage from '@utilities/localstorage';
import type {ProtectedRouteType, UserRouteType} from '@ts-types/route.type';
import {selectAuthenticatedUser, selectUserToken} from '@modules/auth/auth.slice';
import type {UserRole} from '@modules/user/types/user.type';

export default function App() {
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const userToken = useAppSelector(selectUserToken);
  const owner = protectedRoutes.filter(route => route.access.includes('owner'));
  const moderator = protectedRoutes.filter(route => route.access.includes('moderator'));
  const librarian = protectedRoutes.filter(route => route.access.includes('librarian'));

  const isAuthenticated = userToken !== '' || localstorage.get(appConfig.storage.ACCESS_TOKEN);
  const role = authenticatedUser?.owner ? 'owner' : authenticatedUser?.moderator ? 'moderator' : 'librarian';

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
            {userRoute[role as UserRole].map((route: ProtectedRouteType, idx: number) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Suspense fallback={<Spin spinning={true} size="large" />}>
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
                  <Suspense fallback={<Spin spinning={true} size="large" />}>
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
