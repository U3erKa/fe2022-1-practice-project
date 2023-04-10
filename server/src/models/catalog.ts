import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  ForeignKey, CreationOptional,
} from 'sequelize';
import type { DB, User } from '../types/models';

const Catalog = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Catalog extends _Catalog {
    static associate(models: DB) {}
  }
  Catalog.init(
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      catalogName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
      timestamps: false,
    },
  );
  return Catalog;
};

abstract class _Catalog extends Model<
  InferAttributes<_Catalog>,
  InferCreationAttributes<_Catalog>
> {
  declare catalogName: string;

  declare _id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
}

export = Catalog;
