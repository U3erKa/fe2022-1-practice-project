import { CREATOR, CUSTOMER } from '../constants';
import { WithId, UserId } from './index';


export type User = WithId<UserId> & UserData;
export type TokenData = WithId<UserId, 'userId'> & UserData;

export type UserData = {
  firstName: string;
  lastName: string;
  avatar: string;
  displayName: string;
  email: string;
  balance: string | number;
  role: typeof CUSTOMER | typeof CREATOR;
  rating: number;
};
