import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import type { DB } from '../types/models';

const Bank = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Bank extends Model<
    InferAttributes<Bank>,
    InferCreationAttributes<Bank>
  > {
    declare cardNumber: string;
    declare name: string;
    declare expiry: string;
    declare cvc: string;
    declare balance: number;

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

export = Bank;
