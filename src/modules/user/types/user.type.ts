export type UserRole = 'owner' | 'moderator' | 'librarian';

export interface IUserResponse {
  addressId: string;
  balance: number;
  birthDate: string;
  blockingReason: string;
  createdAt: string;
  extra: null;
  extraPhone: null;
  firstName: string;
  fullName: string;
  gender: 'male';
  id: number;
  lastName: string;
  librarian: boolean;
  libraryId: number;
  locationId: number;
  moderator: boolean;
  owner: boolean;
  passportId: null;
  passportImage: null;
  phone: string;
  phoneVerified: boolean;
  pinfl: null;
  status: number;
  telegramId: null;
  updatedAt: string;
  username: string;
  verified: boolean;
}
