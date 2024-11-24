import {Form, Input, Button, Card, Space, Flex, notification} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import localstorage from '@utilities/localstorage';
import {appConfig, ROUTES} from '@constants';
import {errorHandler} from '@helpers';
import AppLogo from '@assets/images/logo.png';

import {loginSchema, LoginFormValues} from './auth.validation';
import styles from './auth.module.scss';
import {useSignInMutation} from './auth.query';

export default function AuthView() {
  const {t} = useTranslation();
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signIn(data).unwrap();
      localstorage.set(appConfig.storage.ACCESS_TOKEN, response.token);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      notification.error({message: errorHandler(error)});
    }
  };

  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Card className={styles.card}>
        <Flex align="center" justify="center" className={styles.logo}>
          <img src={AppLogo} alt={`app logo`} />
        </Flex>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" style={{maxWidth: 600}}>
          <Form.Item label={t('username')} validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
            <Controller
              name="username"
              control={control}
              render={({field}) => <Input {...field} prefix={<UserOutlined />} placeholder={t('username_paceholder')} size="large" />}
            />
          </Form.Item>

          <Form.Item label={t('password')} validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({field}) => <Input.Password {...field} prefix={<LockOutlined />} placeholder={t('password_paceholder')} size="large" />}
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" size="large" align="start">
              <Button type="primary" htmlType="submit" size="large" block loading={isSubmitting}>
                {t('signin')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
