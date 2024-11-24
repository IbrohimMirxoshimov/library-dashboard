import {FileDoneOutlined, ReadOutlined, DashboardOutlined} from '@ant-design/icons';

import {ROUTES} from '@constants/routes';
import localization from '@localization';
import {SidebarMenuType} from '@ts-types/sidebar.type';

export const sidebarMenu: SidebarMenuType[] = [
  {
    key: ROUTES.DASHBOARD,
    icon: <DashboardOutlined />,
    label: localization.t('dashboard'),
    access: ['owner'],
  },
  {
    key: ROUTES.RENT_LIST,
    icon: <FileDoneOutlined />,
    label: localization.t('rents'),
    access: ['owner'],
  },
  {
    key: ROUTES.READER_LIST,
    icon: <ReadOutlined />,
    label: localization.t('readers'),
    access: ['owner'],
  },
];
