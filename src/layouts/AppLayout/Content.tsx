import React from 'react';
import {Layout} from 'antd';

import cn from '@utilities/classNames';

interface IProps {
  children: React.ReactNode;
}

export default function AppLayoutContent({children}: IProps) {
  return (
    <Layout.Content className={cn('p-4')}>
      <Layout className={cn('min-h-72 h-[calc(100vh-112px)] p-4 bg-white rounded-lg')}>{children}</Layout>
    </Layout.Content>
  );
}
