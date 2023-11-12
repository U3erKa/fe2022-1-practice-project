import { DataTypes, Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
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
import type { DB } from '../types/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../../config/postgres.json');

const config = (await import(configPath, { assert: { type: 'json' } })).default[
  env
];
const db = {} as DB;

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

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
