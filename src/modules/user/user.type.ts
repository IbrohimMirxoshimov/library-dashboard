import {IRoleListItem} from '@modules/role/role.type';
import {IPagination} from '@ts-types/global.type';

export interface IUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  extra: string;
  gender: string;
  birth_date: string;
  phone_verified: boolean;
  telegram_id: number;
  passport_id: number;
  passport_image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  extra_phone: string;
  extra_phone_second: string;
  passport_pin: string;
  status: 'ACTIVE';
  balance: number;
  blocking_reason: string;
  registered_locations: [];
  address_id: number;
  role_id: number;
  role: IRoleListItem;
}

export type IUserList = IPagination<IUserResponse>;
