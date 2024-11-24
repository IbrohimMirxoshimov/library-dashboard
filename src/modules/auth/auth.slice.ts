import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '@store/index';
import {authApi} from './auth.query';
import {ISignInResponse} from './auth.type';

const initialState = {
  user: null,
  token: '',
} as ISignInResponse;

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const {logout} = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.token !== '';
export const selectAuthenticatedUser = (state: RootState) => state.auth.user;
export const selectUserToken = (state: RootState) => state.auth.token;
