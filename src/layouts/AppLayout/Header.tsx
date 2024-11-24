import {Layout, Dropdown, Button, Avatar} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, CopyOutlined} from '@ant-design/icons';

import localization from '@localization';
import {ROUTES} from '@constants/routes';

import styles from './AppLayout.module.scss';

interface IProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function AppLayoutHeader({collapsed, setCollapsed}: IProps) {
  return (
    <Layout.Header className={styles.appLayoutHeader}>
      <Button
        type="text"
        title="Menu button"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className={styles.menuButton}
      />
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        menu={{
          items: [
            {key: 'get_token', label: localization.t('getToken'), icon: <CopyOutlined />},
            {
              key: ROUTES.SIGN_IN,
              label: localization.t('signout'),
              icon: <LogoutOutlined />,
            },
          ],
          rootClassName: styles.dropdownMenu,
        }}
        className={styles.dropdown}>
        <div className={styles.profile}>
          <Avatar size={36} className={styles.profileAvatar}>
            K
          </Avatar>
          <div className={styles.profileUser}>
            <h4 className={styles.profileUserName}>Hello</h4>
            <span className={styles.profileUserRole}>Ku</span>
          </div>
        </div>
      </Dropdown>
    </Layout.Header>
  );
}
