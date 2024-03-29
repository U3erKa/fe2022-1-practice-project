import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import type { DB } from 'types/models';

export default function Select(sequelize: Sequelize) {
  class Select extends _Select {
    static associate(models: DB) {}
  }
  Select.init(
    {
      describe: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Select',
      timestamps: false,
    },
  );
  return Select;
}

class _Select extends Model<
  InferAttributes<_Select>,
  InferCreationAttributes<_Select>
> {
  declare type: string;
  declare describe: string;
}
