import {Layout} from 'antd';

interface IProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: IProps) {
  return <Layout>{children}</Layout>;
}
