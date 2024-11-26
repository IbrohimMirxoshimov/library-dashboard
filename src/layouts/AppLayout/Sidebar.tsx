import {Layout, Menu} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';

import {sidebarMenu} from '@constants/sidebar';

import styles from './AppLayout.module.scss';

interface IProps {
  collapsed: boolean;
}

export default function AppLayoutSidebar({collapsed}: IProps) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout.Sider theme="light" width={250} collapsible collapsed={collapsed} className={styles.appLayoutSidebar}>
      <Menu
        theme="light"
        mode="inline"
        className={styles.menu}
        defaultSelectedKeys={[location.pathname]}
        onSelect={e => navigate(e.key)}
        items={sidebarMenu.map(el => ({...el, className: styles.menuItem}))}
      />
    </Layout.Sider>
  );
}
