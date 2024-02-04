import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import type { DB } from 'types/models';

export default function Bank(sequelize: Sequelize) {
  class Bank extends _Bank {
    static associate(models: DB) {}
  }
  Bank.init(
    {
      cardNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expiry: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cvc: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      balance: {
        allowNull: false,
        type: DataTypes.DECIMAL,
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
}

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
