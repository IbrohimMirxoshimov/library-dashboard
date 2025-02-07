import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Layout, Dropdown, Button, Avatar, Flex, notification} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, CopyOutlined} from '@ant-design/icons';

import {useAppDispatch, useAppSelector} from '@store';
import {appConfig} from '@constants';
import {ROUTES} from '@constants/routes.constants';
import cn from '@utilities/classNames';
import localstorage from '@utilities/localstorage';
import {logout, selectUser} from '@modules/auth/auth.slice';

import {config} from '@constants/config.constants';
import AppLogo from '@assets/images/logo.png';
import AppLogoSM from '@assets/images/logo-sm.png';

interface IProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function AppLayoutHeader({collapsed, setCollapsed}: IProps) {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  // console.log({user});

  const handleLogout = () => {
    dispatch(logout());

    navigate(ROUTES.SIGN_IN);
  };

  return (
    <Layout.Header className={cn('flex items-center justify-between p-0 h-16 bg-white leading-4')}>
      <div className={cn('w-[250px] h-16 flex-shrink-0 flex items-center justify-center', collapsed && 'w-20')}>
        <img src={collapsed ? AppLogoSM : AppLogo} alt={`${config.APP_NAME} logo`} />
      </div>
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
                onClick: handleLogout,
              },
            ],
            rootClassName: cn('!p-0'),
          }}
          className={cn('w-max max-w-[300px] min-w-[200px] cursor-pointer')}>
          <div className={cn('flex items-center gap-3')}>
            <Avatar size={36} className={cn('bg-[#3e79f72e] text-[#3e79f7] flex-shrink-0')}>
              {(user && user?.first_name[0]) || 'U'}
            </Avatar>
            <div className={cn('flex flex-col gap-1.5')}>
              <h4>{(user && user?.first_name) || 'Undefined'}</h4>
              <span className={cn('max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis')}>{user && user?.last_name}</span>
            </div>
          </div>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
}
