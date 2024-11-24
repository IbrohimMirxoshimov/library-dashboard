import {IUserResponse} from '@modules/user/types/user.type';

export interface ISignInResponse {
  token: string;
  user: IUserResponse | null;
}
