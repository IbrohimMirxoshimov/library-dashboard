import {IUserResponse} from '@modules/user/user.type';

export interface ISignInResponse {
  access_token: string;
  user: IUserResponse | null;
}

export interface IAuthState extends ISignInResponse {
  permissions: number[];
}
