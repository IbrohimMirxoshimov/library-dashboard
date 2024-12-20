import {useTranslation} from 'react-i18next';
import {Layout, Dropdown, Button, Avatar, Flex, notification} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, CopyOutlined} from '@ant-design/icons';

import {appConfig} from '@constants';
import {ROUTES} from '@constants/routes';
import cn from '@utilities/classNames';
import localstorage from '@utilities/localstorage';

import AppLayoutLogo from './Logo';

interface IProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function AppLayoutHeader({collapsed, setCollapsed}: IProps) {
  const {t} = useTranslation();
  return (
    <Layout.Header className={cn('flex items-center justify-between p-0 h-16 bg-white leading-4')}>
      <AppLayoutLogo collapsed={collapsed} />
      <Flex align="center" justify="space-between" style={{width: '100%'}}>
        <Button
          type="text"
          title="Menu button"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className={cn('text-base hover:!bg-transparent focus:!bg-transparent')}
        />
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'get_token',
                label: t('get_token'),
                icon: <CopyOutlined />,
                onClick: () => {
                  navigator.clipboard
                    .writeText(localstorage.get(appConfig.storage.ACCESS_TOKEN) || '')
                    .then(() => notification.success({message: t('token_copied')}));
                },
              },
              {
                key: ROUTES.SIGN_IN,
                label: t('sign_out'),
                icon: <LogoutOutlined />,
              },
            ],
            rootClassName: cn('!p-0'),
          }}
          className={cn('w-max max-w-[300px] min-w-[200px] cursor-pointer')}>
          <div className={cn('flex items-center gap-3')}>
            <Avatar size={36} className={cn('bg-[#3e79f72e] text-[#3e79f7] flex-shrink-0')}>
              K
            </Avatar>
            <div className={cn('flex flex-col gap-1.5')}>
              <h4>Hello</h4>
              <span className={cn('max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis')}>Ku</span>
            </div>
          </div>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
}
