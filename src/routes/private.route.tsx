import {FileDoneOutlined, ReadOutlined, DashboardOutlined} from '@ant-design/icons';

import PAGES from '@pages';
import localization from '@localization';
import {ROUTES, permissions} from '@constants';
import type {IProtectedRoute} from '@ts-types/route.type';

export const protectedRoutes: IProtectedRoute[] = [
  {
    isSidebarMenu: true,
    path: ROUTES.DASHBOARD,
    component: <PAGES.Dashboard />,
    icon: <DashboardOutlined />,
    label: localization.t('dashboard'),
    permission: permissions.DASHBOARD,
  },

  // ----- READER ROUTES -----
  {
    isSidebarMenu: true,
    path: ROUTES.READER_LIST,
    component: <PAGES.Reader.List />,
    icon: <ReadOutlined />,
    label: localization.t('readers'),
    permission: permissions.CUSTOMER_READ,
  },
  {
    isSidebarMenu: false,
    path: ROUTES.READER_UPDATE,
    component: <PAGES.Reader.Create />,
    permission: permissions.CUSTOMER_CREATE,
  },

  // ----- RENT ROUTES -----
  {
    isSidebarMenu: true,
    path: ROUTES.RENT_LIST,
    component: <PAGES.Rent.List />,
    icon: <FileDoneOutlined />,
    label: localization.t('rents'),
    permission: permissions.RENT_READ,
  },
];
