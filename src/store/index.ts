import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {baseStoreQuery} from './query';

const store = configureStore({
  reducer: {
    [baseStoreQuery.reducerPath]: baseStoreQuery.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseStoreQuery.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkType = {state: RootState};
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
