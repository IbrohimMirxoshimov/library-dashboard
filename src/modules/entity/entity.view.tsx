import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import qs from 'qs';
import {Flex, Table, Typography, Button, TableProps} from 'antd';

import {useAppDispatch} from '@store';
import {appConfig} from '@constants';

import {entityModules} from './entity.modules';
import {ENTITY} from './entity.type';
import {opendDrawer} from './store/entity.slice';
import {useEntityListQuery} from './store/entity.query';

const {Title} = Typography;

interface IEntityListProps {
  name: ENTITY;
}

export default function EntityView({name}: IEntityListProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = qs.parse(location.search, {ignoreQueryPrefix: true});

  const entityListModule = useMemo(() => entityModules[name as keyof typeof entityModules]?.list(location.search), [name, location.search]);

  const {data, isLoading, refetch} = useEntityListQuery(
    {url: entityListModule?.url, method: entityListModule?.method, body: entityListModule?.body},
    {refetchOnMountOrArgChange: true},
  );

  const dataSource = data?.items ?? [];

  const handleRowClick = (record: (typeof dataSource)[0]) => {
    return {
      onClick: () => {
        dispatch(opendDrawer(record));
      },
    };
  };

  const onChange: TableProps<(typeof dataSource)[0]>['onChange'] = (pn, _filters, sorter) => {
    navigate({
      pathname: entityListModule?.path,
      search: qs.stringify({
        ...('field' in sorter && 'order' in sorter ? {order: sorter.order === 'ascend' ? 'asc' : 'desc', order_by: sorter.field} : {}),
        ...('current' in pn ? {page: pn.current} : {}),
        ...('pageSize' in pn ? {limit: pn.pageSize} : {}),
      }),
    });
  };

  return (
    <Flex vertical gap={16}>
      <Flex align="center" justify="space-between" className="">
        <Title level={3}>{entityListModule?.title}</Title>
        <Flex>search here</Flex>
        <Flex align="center" gap={10}>
          <Button onClick={refetch}>{t('refresh')}</Button>
          <Button type="primary">{t('add')}</Button>
        </Flex>
      </Flex>
      <Table
        columns={entityListModule?.columns || []}
        rowKey="id"
        onRow={handleRowClick}
        sortDirections={['ascend', 'descend', 'ascend']}
        dataSource={dataSource}
        loading={isLoading}
        onChange={onChange}
        pagination={{
          current: Number(params?.page) || 1,
          pageSize: Number(params?.limit) || appConfig.defaultPageSize,
          total: data?.total / (Number(params?.limit) || appConfig.defaultPageSize),
          showSizeChanger: true,
          pageSizeOptions: appConfig.pageSizeOptions,
        }}
      />
    </Flex>
  );
}
