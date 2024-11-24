import {ReactElement} from 'react';

import {ROUTES} from '@constants/routes';
import {UserRole} from '@modules/user/types/user.type';

export interface SidebarMenuType {
  key: (typeof ROUTES)[keyof typeof ROUTES];
  icon: ReactElement;
  label: string;
  access: UserRole[];
}
