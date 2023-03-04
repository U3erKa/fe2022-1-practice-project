import type _Sequelize from 'sequelize';
import type _Bank from '../models/bank';
import type _Contest from '../models/contest';
import type _Offer from '../models/offer';
import type _Rating from '../models/rating';
import type _RefreshToken from '../models/refreshToken';
import type _Select from '../models/select';
import type _User from '../models/user';

export type DB = {
  sequelize: InstanceType<(typeof _Sequelize)['Sequelize']>;
  Sequelize: typeof _Sequelize;
  Bank: ReturnType<typeof _Bank>;
  Contest: ReturnType<typeof _Contest>;
  Offer: ReturnType<typeof _Offer>;
  Rating: ReturnType<typeof _Rating>;
  RefreshToken: ReturnType<typeof _RefreshToken>;
  Select: ReturnType<typeof _Select>;
  User: ReturnType<typeof _User>;
};
