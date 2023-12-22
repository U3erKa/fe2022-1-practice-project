// const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    url: process.env.POSTGRES_DB_STRING,
    use_env_variable: 'POSTGRES_DB_STRING',
  },
  test: {
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    url: process.env.POSTGRES_DB_STRING,
    use_env_variable: 'POSTGRES_DB_STRING',
  },
  production: {
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    url: process.env.POSTGRES_DB_STRING,
    use_env_variable: 'POSTGRES_DB_STRING',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/postgres-ca-main.crt'),
    //   },
    // },
  },
};
