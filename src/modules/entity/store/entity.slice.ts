import {createSlice} from '@reduxjs/toolkit';

// import {permissions} from '@constants';
// import {config} from '@constants/config';
// import storage from '@utilities/localstorage';

import {IEntityState} from '../entity.type';

const initialState = {
  list: {
    items: [],
    total: 0,
    page: 1,
  },
  single: null,
  isDrawerOpen: false,
} as IEntityState<unknown>;

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    opendDrawer(state, {payload}) {
      state.single = payload;
      state.isDrawerOpen = true;
    },
    closeDrawer(state) {
      state.single = null;
      state.isDrawerOpen = false;
    },
  },
  // extraReducers: builder => {
  //   builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, {payload}) => {
  //     const userPermissions = [permissions.DASHBOARD, ...(payload.user?.role?.permissions || [])];
  //   });
  // },
});

export const {opendDrawer, closeDrawer} = entitySlice.actions;
export default entitySlice.reducer;
