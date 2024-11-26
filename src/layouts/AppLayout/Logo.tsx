import clsx from 'clsx';

import {config} from '@constants/config';
import AppLogo from '@assets/images/logo.png';
import AppLogoSM from '@assets/images/logo-sm.png';

import styles from './AppLayout.module.scss';

interface IProps {
  collapsed: boolean;
}

export default function AppLayoutLogo({collapsed}: IProps) {
  return (
    <div className={clsx(styles.appLayoutLogo, collapsed && styles.appLayoutLogoCollapsed)}>
      <img src={collapsed ? AppLogoSM : AppLogo} alt={`${config.APP_NAME} logo`} />
    </div>
  );
}
