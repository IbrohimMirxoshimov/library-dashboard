export interface IPagination<T> {
  total: number;
  page: number;
  items: T[];
}

export interface IResponseBase {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export type SortOrder = 'asc' | 'desc';

export interface IListBaseParams {
  limit: number;
  page: number;
  order: SortOrder;
  order_by: string;
}
