import React from 'react';
import {UserRole} from '@modules/user/types/user.type';

export interface ProtectedRouteType {
  path: string;
  component: React.ReactNode;
  access: UserRole[];
}

export interface PublicRouteType {
  path: string;
  component: React.ReactNode;
}

export interface UserRouteType {
  owner: ProtectedRouteType[];
  moderator: ProtectedRouteType[];
  librarian: ProtectedRouteType[];
  default: PublicRouteType[];
}
