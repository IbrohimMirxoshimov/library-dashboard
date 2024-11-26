import {baseStoreQuery} from '@store/query';

import type {ISignInResponse} from '@modules/auth/auth.type';
import type {LoginFormValues} from './auth.validation';

export const authApi = baseStoreQuery.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<ISignInResponse, LoginFormValues>({
      query: args => ({
        url: `/auth/login`,
        method: 'POST',
        body: args,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useSignInMutation} = authApi;
