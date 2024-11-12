import React from 'react';
import {Layout} from 'antd';

import styles from './AppLayout.module.scss';

interface IProps {
  children: React.ReactNode;
}

export default function AppLayoutContent({children}: IProps) {
  return <Layout.Content className={styles.appLayoutContent}>{children}</Layout.Content>;
}
