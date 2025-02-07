import {Typography, type TableColumnsType} from 'antd';
import dayjs from 'dayjs';

import localization from '@localization';
import {IAuthorListItem} from './author.type';

export const AUTHOR_COLUMNS: TableColumnsType<IAuthorListItem> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: localization.t('name'),
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: localization.t('created_at'),
    dataIndex: 'created_at',
    sorter: true,
    render: (value: string) => <Typography.Text>{dayjs(value).format('DD.MM.YYYY HH:mm')}</Typography.Text>,
  },
  {
    title: localization.t('updated_at'),
    dataIndex: 'updated_at',
    sorter: true,
    render: (value: string) => <Typography.Text>{dayjs(value).format('DD.MM.YYYY HH:mm')}</Typography.Text>,
  },
];
