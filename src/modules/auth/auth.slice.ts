import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '@store/index';

import {permissions} from '@constants';
import {config} from '@constants/config';
import storage from '@utilities/localstorage';

import {authApi} from './auth.query';
import {IAuthState} from './auth.type';

const initialState = {
  user: null,
  permissions: storage.get(config.storage.PERMISSION) || [],
  access_token: storage.get(config.storage.ACCESS_TOKEN) || '',
} as IAuthState;

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, {payload}) => {
      const userPermissions = [permissions.DASHBOARD, ...(payload.user?.role?.permissions || [])];
      storage.set(config.storage.ACCESS_TOKEN, payload.access_token);
      storage.set(config.storage.PERMISSION, userPermissions);
      state.user = payload.user;
      state.permissions = userPermissions;
      state.access_token = payload.access_token;
    });
  },
});

export const {logout} = slice.actions;
export default slice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserPermissions = (state: RootState) => state.auth.permissions;
export const selectUserToken = (state: RootState) => state.auth.access_token;
