import {Suspense} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Spin} from 'antd';

import {ROUTES} from '@constants';
import {protectedRoutes, publicRoutes} from '@routes';
import {AppLayout, AuthLayout} from '@layouts';
import type {IProtectedRoute} from '@ts-types/route.type';
import {useAppSelector} from '@store';
import {selectUserToken, selectUserPermissions} from '@modules/auth/auth.slice';

export default function App() {
  const userToken = useAppSelector(selectUserToken);
  const userPermissions = useAppSelector(selectUserPermissions);

  const isAuthenticated = userToken !== '';
  const userRoutes = protectedRoutes.filter(route => userPermissions.includes(route.permission));

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
