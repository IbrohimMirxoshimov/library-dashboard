import {Layout, Menu} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';

import {useAppSelector} from '@store';
import {protectedRoutes} from '@routes';
import {selectAuthenticatedUser} from '@modules/auth/auth.slice';

import styles from './AppLayout.module.scss';

interface IProps {
  collapsed: boolean;
}

export default function AppLayoutSidebar({collapsed}: IProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector(selectAuthenticatedUser);

  const userPermissions = user?.role?.permissions || [];

  const userSidebarMenu = protectedRoutes.filter(el => el.isSidebarMenu).filter(route => userPermissions.includes(route.permission));

  return (
    <Layout.Sider theme="light" width={250} collapsible collapsed={collapsed} className={styles.appLayoutSidebar}>
      <Menu
        theme="light"
        mode="inline"
        className={styles.menu}
        defaultSelectedKeys={[location.pathname]}
        onSelect={e => navigate(e.key)}
        items={userSidebarMenu.map(el => ({key: el.path, label: el.label, icon: el.icon, className: styles.menuItem}))}
      />
    </Layout.Sider>
  );
}
