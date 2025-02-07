import {Layout, Menu} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';

import {protectedRoutes} from '@routes';
import cn from '@utilities/classNames';

interface IProps {
  collapsed: boolean;
}

export default function AppLayoutSidebar({collapsed}: IProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout.Sider theme="light" width={250} collapsible collapsed={collapsed} className={cn('h-[calc(100vh - 64px)] overflow-y-auto')} trigger={null}>
      <Menu
        theme="light"
        mode="inline"
        className={cn('py-4')}
        defaultSelectedKeys={[location.pathname]}
        onSelect={e => navigate(e.key)}
        items={protectedRoutes
          .filter(el => el.isSidebarMenu)
          .map(el => ({
            key: el.path,
            label: el.label,
            icon: el.icon,
            className: cn('w-full rounded-none ms-0 me-0'),
          }))}
      />
    </Layout.Sider>
  );
}
