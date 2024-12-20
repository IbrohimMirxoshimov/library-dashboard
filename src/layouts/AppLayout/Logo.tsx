import {config} from '@constants/config';
import cn from '@utilities/classNames';
import AppLogo from '@assets/images/logo.png';
import AppLogoSM from '@assets/images/logo-sm.png';

interface IProps {
  collapsed: boolean;
}

export default function AppLayoutLogo({collapsed}: IProps) {
  return (
    <div className={cn('w-[250px] h-16 flex-shrink-0 flex items-center justify-center', collapsed && 'w-20')}>
      <img src={collapsed ? AppLogoSM : AppLogo} alt={`${config.APP_NAME} logo`} />
    </div>
  );
}
