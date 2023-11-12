// const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'POSTGRES_DB_STRING',
    url: process.env.POSTGRES_DB_STRING,
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
  },
  test: {
    use_env_variable: 'POSTGRES_DB_STRING',
    url: process.env.POSTGRES_DB_STRING,
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'POSTGRES_DB_STRING',
    url: process.env.POSTGRES_DB_STRING,
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/postgres-ca-main.crt'),
    //   },
    // },
  },
};
