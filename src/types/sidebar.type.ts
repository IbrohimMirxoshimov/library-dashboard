import {ReactElement} from 'react';

import {AppRoutes} from '@constants/routes';
import {UserRole} from 'src/modules/user/types/user.type';

export type SidebarMenuType = {
  key: (typeof AppRoutes)[keyof typeof AppRoutes];
  icon: ReactElement;
  label: string;
  access: UserRole[];
};
