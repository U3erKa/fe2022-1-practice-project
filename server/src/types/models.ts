import type Sequelize from 'sequelize';
import type Bank from '../models/bank';
import type Contest from '../models/contest';
import type Offer from '../models/offer';
import type Rating from '../models/rating';
import type RefreshToken from '../models/refreshToken';
import type Select from '../models/select';
import type User from '../models/user';

export type DB = {
  sequelize: InstanceType<(typeof Sequelize)['Sequelize']>;
  Sequelize: typeof Sequelize;
  Bank: ReturnType<typeof Bank>;
  Contest: ReturnType<typeof Contest>;
  Offer: ReturnType<typeof Offer>;
  Rating: ReturnType<typeof Rating>;
  RefreshToken: ReturnType<typeof RefreshToken>;
  Select: ReturnType<typeof Select>;
  User: ReturnType<typeof User>;
};
