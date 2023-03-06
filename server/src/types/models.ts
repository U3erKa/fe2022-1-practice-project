import type Sequelize from 'sequelize';
import type { Model } from 'sequelize';
import type _Bank from '../models/bank';
import type _Contest from '../models/contest';
import type _Offer from '../models/offer';
import type _Rating from '../models/rating';
import type _RefreshToken from '../models/refreshToken';
import type _Select from '../models/select';
import type _User from '../models/user';

export type DB = {
  sequelize: InstanceType<(typeof Sequelize)['Sequelize']>;
  Sequelize: typeof Sequelize;
  Bank: ReturnType<typeof _Bank>;
  Contest: ReturnType<typeof _Contest>;
  Offer: ReturnType<typeof _Offer>;
  Rating: ReturnType<typeof _Rating>;
  RefreshToken: ReturnType<typeof _RefreshToken>;
  Select: ReturnType<typeof _Select>;
  User: ReturnType<typeof _User>;
};

export type Bank = InstanceType<DB['Bank']>;
export type Contest = InstanceType<DB['Contest']>;
export type Offer = InstanceType<DB['Offer']>;
export type Rating = InstanceType<DB['Rating']>;
export type RefreshToken = InstanceType<DB['RefreshToken']>;
export type Select = InstanceType<DB['Select']>;
export type User = InstanceType<DB['User']>;
