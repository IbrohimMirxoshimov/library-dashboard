import {IListBaseParams} from '@ts-types/global.type';

export interface IAuthorCreate {
  name: string;
}

export interface IAuthorListParams extends IListBaseParams {
  filter: {
    name: string;
  };
}

export interface IAuthor {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  creator_id: number;
}

export interface IAuthorListItem extends IAuthor {}
