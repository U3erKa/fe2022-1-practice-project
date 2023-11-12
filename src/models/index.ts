import fs from 'fs';
import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import type { DB } from '../types/models';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../../config/postgres.json'))[env];
const db = {} as DB;

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
      ['.js', '.ts'].includes(file.slice(-3)) &&
      file.indexOf('.test.js') === -1 &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
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
