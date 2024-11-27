import {IPagination} from '@ts-types/global.type';

export interface IRoleListItem {
  id: number;
  name: string;
  location_id: number;
  permissions: number[];
}

export type IRoleList = IPagination<IRoleListItem>;
