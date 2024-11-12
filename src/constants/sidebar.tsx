import {FileDoneOutlined, ReadOutlined, DashboardOutlined} from '@ant-design/icons';

import {AppRoutes} from '@constants/routes';
import {localization} from '@localization';
import {SidebarMenuType} from 'src/types/sidebar.type';

export const sidebarMenu: SidebarMenuType[] = [
  {
    key: AppRoutes.DASHBOARD,
    icon: <DashboardOutlined />,
    label: localization.t('dashboard'),
    access: ['owner'],
  },
  {
    key: AppRoutes.RENT_LIST,
    icon: <FileDoneOutlined />,
    label: localization.t('rents'),
    access: ['owner'],
  },
  {
    key: AppRoutes.READER_LIST,
    icon: <ReadOutlined />,
    label: localization.t('readers'),
    access: ['owner'],
  },
];
