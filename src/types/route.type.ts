import React from 'react';
import {UserRole} from 'src/modules/user/types/user.type';

export type ProtectedRouteType = {
  path: string;
  component: React.ReactNode;
  access: UserRole[];
};

export type PublicRouteType = {
  path: string;
  component: React.ReactNode;
};

export type UserRouteType = {
  owner: ProtectedRouteType[];
  moderator: ProtectedRouteType[];
  librarian: ProtectedRouteType[];
  default: PublicRouteType[];
};
