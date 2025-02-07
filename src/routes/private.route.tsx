import {FileDoneOutlined, ReadOutlined, DashboardOutlined} from '@ant-design/icons';

import PAGES from '@pages';
import localization from '@localization';
import {ROUTES, permissions} from '@constants';
import type {IProtectedRoute} from '@ts-types/route.type';
import EntityView from '@modules/entity/entity.view';
import {ENTITY} from '@modules/entity/entity.type';

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
    path: ROUTES.USER_LIST,
    component: <EntityView name={ENTITY.USER} />,
    icon: <ReadOutlined />,
    label: localization.t('readers'),
    permission: permissions.USER_READ,
  },
  {
    isSidebarMenu: true,
    path: ROUTES.RENT_LIST,
    component: <EntityView name={ENTITY.RENT} />,
    icon: <FileDoneOutlined />,
    label: localization.t('rents'),
    permission: permissions.RENT_READ,
  },
  {
    isSidebarMenu: true,
    path: ROUTES.AUTHOR_LIST,
    component: <EntityView name={ENTITY.AUTHOR} />,
    icon: <FileDoneOutlined />,
    label: localization.t('authors'),
    permission: permissions.AUTHOR_READ,
  },
];
