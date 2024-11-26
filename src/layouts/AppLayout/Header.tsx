import {useTranslation} from 'react-i18next';
import {Layout, Dropdown, Button, Avatar, Flex, notification} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, CopyOutlined} from '@ant-design/icons';

import {appConfig} from '@constants';
import {ROUTES} from '@constants/routes';
import localstorage from '@utilities/localstorage';

import AppLayoutLogo from './Logo';
import styles from './AppLayout.module.scss';

interface IProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function AppLayoutHeader({collapsed, setCollapsed}: IProps) {
  const {t} = useTranslation();
  return (
    <Layout.Header className={styles.appLayoutHeader}>
      <AppLayoutLogo collapsed={collapsed} />
      <Flex align="center" justify="space-between" style={{width: '100%'}}>
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
              {
                key: 'get_token',
                label: t('getToken'),
                icon: <CopyOutlined />,
                onClick: () => {
                  navigator.clipboard
                    .writeText(localstorage.get(appConfig.storage.ACCESS_TOKEN) || '')
                    .then(() => notification.success({message: t('token_copied')}));
                },
              },
              {
                key: ROUTES.SIGN_IN,
                label: t('signout'),
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
      </Flex>
    </Layout.Header>
  );
}
