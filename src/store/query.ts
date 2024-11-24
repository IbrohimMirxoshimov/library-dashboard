import {createApi, fetchBaseQuery, retry, BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

import {appConfig, ROUTES} from '@constants';
import storage from '@utilities/localstorage';
import i18n from '@localization';
import {HttpStatus} from '@helpers';

import {isFetchBaseQueryError} from './error.handler';

const baseQueryWithRetry = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: appConfig.BASE_URL,
      prepareHeaders: headers => {
        headers.set('Content-Type', 'application/json;charset=utf-8');

        const accessToken = storage.get(appConfig.storage.ACCESS_TOKEN);
        if (accessToken) {
          headers.set('authorization', `Bearer ${accessToken}`);

          if (!headers.has('Accept-Language') && accessToken) {
            headers.set('Accept-Language', i18n.language || 'en');
          }
        }
        return headers;
      },
    });

    try {
      const result = await baseQuery(args, api, extraOptions);

      if (result.error && result.error.status === HttpStatus.UNAUTHORIZED) {
        storage.remove(appConfig.storage.ACCESS_TOKEN);
        window.location.href = ROUTES.SIGN_IN;
        retry.fail(result.error);
      }

      return result;
    } catch (error: unknown) {
      if (isFetchBaseQueryError(error)) {
        return Promise.reject(error.data);
      }
      return {error: {status: 'FETCH_ERROR', error: 'Unknown error occurred'} as FetchBaseQueryError};
    }
  },
  {
    maxRetries: 1,
  },
) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export const baseStoreQuery = createApi({
  reducerPath: 'baseQuery',
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});
