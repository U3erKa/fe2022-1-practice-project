'use strict';
import { Model } from 'sequelize';
const RefreshToken = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      RefreshToken.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  RefreshToken.init(
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    },
  );
  return RefreshToken;
};

// @ts-expect-error
export = RefreshToken;
