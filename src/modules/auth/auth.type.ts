import {IUserResponse} from '@modules/user/user.type';

export interface ISignInResponse {
  token: string;
  user: IUserResponse | null;
}
