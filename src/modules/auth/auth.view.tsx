import {Form, Input, Button, Card, Space, Flex, notification} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {ROUTES} from '@constants';
import {errorHandler} from '@helpers';
import cn from '@utilities/classNames';
import AppLogo from '@assets/images/logo.png';

import {loginSchema, LoginFormValues} from './auth.validation';
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
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn(data).unwrap();
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      notification.error({message: errorHandler(error)});
    }
  };

  return (
    <Flex align="center" justify="center" className={cn('min-h-screen bg-[#fafafb]')}>
      <Card className={cn('w-full max-w-100')}>
        <Flex align="center" justify="center" className={cn('h-16 flex-shrink-0')}>
          <img src={AppLogo} alt={`app logo`} />
        </Flex>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={cn('max-w-150')}>
          <Form.Item label={t('phone')} validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              render={({field}) => <Input {...field} prefix={<UserOutlined />} placeholder={t('phone_placeholder')} size="large" />}
            />
          </Form.Item>

          <Form.Item label={t('password')} validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({field}) => <Input.Password {...field} prefix={<LockOutlined />} placeholder={t('password_placeholder')} size="large" />}
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" size="large" align="start">
              <Button type="primary" htmlType="submit" size="large" block loading={isSubmitting}>
                {t('sign_in')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
