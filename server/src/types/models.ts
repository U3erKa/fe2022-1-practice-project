import type Sequelize from 'sequelize';
import type { Model } from 'sequelize';
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
  Bank: ReturnType<typeof Bank> & Model;
  Contest: ReturnType<typeof Contest> & Model;
  Offer: ReturnType<typeof Offer> & Model;
  Rating: ReturnType<typeof Rating> & Model;
  RefreshToken: ReturnType<typeof RefreshToken> & Model;
  Select: ReturnType<typeof Select> & Model;
  User: ReturnType<typeof User> & Model;
};
