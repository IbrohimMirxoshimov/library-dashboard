import {Flex, Typography, Button} from 'antd';
import {useTranslation} from 'react-i18next';

const {Title} = Typography;

export default function EntityHeader() {
  const {t} = useTranslation();
  return (
    <Flex align="center" justify="space-between" className="">
      <Title>Entity</Title>
      <Flex>search here</Flex>
      <Flex align="center">
        <Button>{t('refresh')}</Button>
        <Button type="primary">{t('add')}</Button>
      </Flex>
    </Flex>
  );
}
