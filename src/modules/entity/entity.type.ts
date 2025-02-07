import {IPagination} from '@ts-types/global.type';

export enum ENTITY {
  USER = 'user',
  BOOK = 'book',
  STOCK = 'stock',
  RENT = 'rent',
  AUTHOR = 'author',
  ROLE = 'role',
  SMS = 'sms',
  LOCATION = 'location',
  PUBLISHER = 'publisher',
  COLLECTION = 'collection',
  LOG = 'log',
  CUSTOMER = 'customer',
  COMMENT = 'comment',
  REGION = 'region',
  STATISTICS = 'statistics',
}

export interface IEntityRequest {
  key: ENTITY;
}

export interface IEntityState<T> {
  list: IPagination<T>;
  single: T | null;
  isDrawerOpen: boolean;
}
