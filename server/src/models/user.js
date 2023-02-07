'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

const hashPassword = async (user, options) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = passwordHash;
  }
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
    static associate({ Offer, Contest, Rating,RefreshToken }) {
      // define association here
      User.hasMany(Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(RefreshToken, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
