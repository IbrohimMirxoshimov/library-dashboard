import {ReactNode} from 'react';

import {ROUTES} from '@constants/routes';
export interface IProtectedRoute {
  path: (typeof ROUTES)[keyof typeof ROUTES];
  icon?: ReactNode;
  label?: string;
  component: ReactNode;
  permission: number;
  isSidebarMenu: boolean;
}

export interface IPublicRoute {
  path: string;
  component: ReactNode;
}
