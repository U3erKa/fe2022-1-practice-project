import { DataTypes, Sequelize } from 'sequelize';
import * as pg from 'pg';
import _Bank from './bank';
import _Catalog from './catalog';
import _Contest from './contest';
import _Conversation from './conversation';
import _Event from './event';
import _Message from './message';
import _Offer from './offer';
import _Rating from './rating';
import _RefreshToken from './refreshToken';
import _Select from './select';
import _User from './user';
import { POSTGRES_DB_STRING } from 'constants/backend';
import type { DB } from '../types/models';

const db = {} as DB;
export const sequelize = new Sequelize(POSTGRES_DB_STRING, {
  dialectModule: pg,
});

[
  _Bank,
  _Catalog,
  _Contest,
  _Conversation,
  _Event,
  _Message,
  _Offer,
  _Rating,
  _RefreshToken,
  _Select,
  _User,
].forEach((createModel) => {
  const model = createModel(sequelize, DataTypes);
  db[model.name as keyof DB] = model;
});

Object.keys(db).forEach((modelName) => {
  // @ts-expect-error
  if (db[modelName].associate) {
    // @ts-expect-error
    db[modelName].associate(db);
  }
});

console.log('db is =>>>>>>>>>>');
console.log(Object.keys(db));

export const {
  Bank,
  Catalog,
  Contest,
  Conversation,
  Event,
  Message,
  Offer,
  Rating,
  RefreshToken,
  Select,
  User,
} = db;

export default db;