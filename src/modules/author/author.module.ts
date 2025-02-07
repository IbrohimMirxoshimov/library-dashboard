import qs from 'qs';

import localization from '@localization';
import {ROUTES} from '@constants';
import {IAuthorCreate} from '@modules/author/author.type';
import {AUTHOR_COLUMNS} from '@modules/author/author.columns';

export const authorModule = {
  list: (searchParams?: string) => {
    const parsedQuery = searchParams ? qs.parse(searchParams, {ignoreQueryPrefix: true}) : {};

    return {
      title: localization.t('author_list'),
      url: '/authors/get-list',
      method: 'POST',
      body: parsedQuery,
      columns: AUTHOR_COLUMNS,
      path: ROUTES.AUTHOR_LIST,
    };
  },
  single: (id: string) => ({
    url: `/authors/${id}`,
    method: 'GET',
  }),
  create: (requestPayload: IAuthorCreate) => {
    return {
      url: '/authors',
      method: 'POST',
      body: qs.stringify(requestPayload),
    };
  },
  update: (requestPayload: IAuthorCreate, id: string) => ({
    url: `/authors/${id}`,
    method: 'PUT',
    body: qs.stringify(requestPayload),
  }),
  delete: (id: string) => ({
    url: `/authors/${id}`,
    method: 'DELETE',
  }),
};
