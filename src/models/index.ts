import { Sequelize } from 'sequelize';
import pg from 'pg';
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
import type { DB } from 'types/models';

const db = {} as DB;
export const sequelize = new Sequelize(POSTGRES_DB_STRING, {
  dialectModule: pg,
});

for (const createModel of [
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
]) {
  const model = createModel(sequelize);
  // @ts-expect-error
  db[model.name as keyof DB] = model;
}

for (const key in db) {
  if (Object.hasOwn(db, key)) {
    const model = db[key as keyof typeof db];
    if (model.associate) model.associate(db);
  }
}
/* eslint-disable no-console */
console.log('db is =>>>>>>>>>>');
console.log(Object.keys(db));
/* eslint-enable no-console */
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
