import {useState} from 'react';
import {Layout} from 'antd';

import AppLayoutSidebar from './Sidebar';
import AppLayoutHeader from './Header';
import AppLayoutContent from './Content';

interface IProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: IProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <AppLayoutSidebar collapsed={collapsed} />
      <Layout>
        <AppLayoutHeader {...{collapsed, setCollapsed}} />
        <AppLayoutContent>{children}</AppLayoutContent>
      </Layout>
    </Layout>
  );
}
