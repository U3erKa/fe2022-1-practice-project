import _Sequelize from 'sequelize';
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
const configPath =
  env === 'production'
    ? path.join(
        __dirname,
        '..',
        '..',
        '..',
        'src/server/config/postgresConfig.json',
      )
    : path.join(__dirname, '..', '/config/postgresConfig.json');

const config = (await import(configPath, { assert: { type: 'json' } })).default[
  env
];
const db = {} as DB;

// @ts-expect-error
const _sequelize = new _Sequelize(
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
  const model = createModel(_sequelize, _Sequelize.DataTypes);
  db[model.name as keyof DB] = model;
});

Object.keys(db).forEach((modelName) => {
  // @ts-expect-error
  if (db[modelName].associate) {
    // @ts-expect-error
    db[modelName].associate(db);
  }
});

db.sequelize = _sequelize;
db.Sequelize = _Sequelize;

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
  sequelize,
  Sequelize,
} = db;

export default db;
