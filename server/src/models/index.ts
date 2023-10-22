import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import type { DB } from '../types/models';

const basename = path.basename(__filename);
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
const config = require(configPath)[env];
const db: DB = {} as any;

// @ts-expect-error
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      ['.js', '.ts'].includes(file.slice(-3))
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name as keyof DB] = model;
  });

Object.keys(db).forEach((modelName) => {
  // @ts-expect-error
  if (db[modelName].associate) {
    // @ts-expect-error
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('db is =>>>>>>>>>>');
console.log(Object.keys(db));

export = db;
