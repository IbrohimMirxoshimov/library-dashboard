import {FileDoneOutlined, ReadOutlined, DashboardOutlined} from '@ant-design/icons';

import localization from '@localization';
import {ROUTES, permissions} from '@constants';
import type {IProtectedRoute} from '@ts-types/route.type';
import PAGES from '@pages';

export const protectedRoutes: IProtectedRoute[] = [
  {
    isSidebarMenu: true,
    path: ROUTES.DASHBOARD,
    component: <PAGES.Dashboard />,
    icon: <DashboardOutlined />,
    label: localization.t('dashboard'),
    permission: permissions.DASHBOARD,
  },
  {
    isSidebarMenu: true,
    path: ROUTES.READER_LIST,
    component: <PAGES.Reader />,
    icon: <ReadOutlined />,
    label: localization.t('readers'),
    permission: permissions.CUSTOMER_READ,
  },
  {
    isSidebarMenu: true,
    path: ROUTES.RENT_LIST,
    component: <PAGES.Rent />,
    icon: <FileDoneOutlined />,
    label: localization.t('rents'),
    permission: permissions.RENT_READ,
  },
];
