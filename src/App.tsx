import {Suspense} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Spin} from 'antd';

import {appConfig, ROUTES} from '@constants';
import {useAppSelector} from '@store';
import {protectedRoutes, publicRoutes} from '@routes';
import {AppLayout, AuthLayout} from '@layouts';
import localstorage from '@utilities/localstorage';
import type {IProtectedRoute} from '@ts-types/route.type';
import {selectAuthenticatedUser, selectUserToken} from '@modules/auth/auth.slice';

export default function App() {
  const user = useAppSelector(selectAuthenticatedUser);
  const userToken = useAppSelector(selectUserToken);

  const isAuthenticated = userToken !== '' || localstorage.get(appConfig.storage.ACCESS_TOKEN);

  const userPermissions = user?.role?.permissions || [];

  const userRoutes = protectedRoutes.filter(route => userPermissions.includes(route.permission));

  // console.log({userRoutes});

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {isAuthenticated ? (
          <Route>
            {userRoutes &&
              userRoutes.length > 0 &&
              userRoutes.map((route: IProtectedRoute, idx: number) => (
                <Route
                  key={route.path + idx}
                  path={route.path}
                  element={
                    <Suspense fallback={<Spin spinning={true} size="large" fullscreen />}>
                      <AppLayout>{route.component}</AppLayout>
                    </Suspense>
                  }
                />
              ))}
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Route>
        ) : (
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Suspense fallback={<Spin spinning={true} size="large" fullscreen />}>
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
