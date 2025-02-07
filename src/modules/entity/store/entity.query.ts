import {baseStoreQuery} from '@store/query';
import {ParsedQs} from 'qs';

export const entityApi = baseStoreQuery.injectEndpoints({
  endpoints: builder => ({
    entityList: builder.query({
      query: ({url, method, body}: {url: string; method: string; body: ParsedQs}) => {
        return {
          url,
          method,
          body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {useEntityListQuery} = entityApi;
