import { Model } from 'sequelize';
import type {
  InferAttributes,
  InferCreationAttributes,
  DataTypes as _DataTypes,
} from 'sequelize';
import type { DB } from '../types/models';

const Bank = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Bank extends _Bank {
    static associate(models: DB) {}
  }
  Bank.init(
    {
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Bank',
      timestamps: false,
    },
  );
  return Bank;
};

abstract class _Bank extends Model<
  InferAttributes<_Bank>,
  InferCreationAttributes<_Bank>
> {
  declare cardNumber: string;
  declare name: string;
  declare expiry: string;
  declare cvc: string;
  declare balance: number;
}

export = Bank;
