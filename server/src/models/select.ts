import { Model } from 'sequelize';
import type {
  InferAttributes,
  InferCreationAttributes,
  DataTypes as _DataTypes,
} from 'sequelize';
import type { DB } from '../types/models';

const Select = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Select extends _Select {
    static associate(models: DB) {}
  }
  Select.init(
    {
      type: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Select',
      timestamps: false,
    },
  );
  return Select;
};

class _Select extends Model<
  InferAttributes<_Select>,
  InferCreationAttributes<_Select>
> {
  declare type: string;
  declare describe: string;
}

export = Select;
