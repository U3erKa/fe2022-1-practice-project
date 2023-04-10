import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  ForeignKey, CreationOptional,
} from 'sequelize';
import type { DB } from '../types/models';

const Conversation = (
  sequelize: DB['sequelize'],
  DataTypes: typeof _DataTypes,
) => {
  function isTuple(list: boolean[]) {
    if (!(list instanceof Array)) {
      // throw ApplicationError?
      throw new Error('Must be an array');
    }
    if (list.length !== 2) {
      // throw ApplicationError?
      throw new Error('Must be tuple of 2 booleans');
    }
  }

  class Conversation extends _Conversation {
    static associate(models: DB) {}
  }
  Conversation.init(
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participant1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      participant2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        validate: {
          isTuple,
        },
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        validate: {
          isTuple,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      timestamps: true,
    },
  );
  return Conversation;
};

abstract class _Conversation extends Model<
  InferAttributes<_Conversation>,
  InferCreationAttributes<_Conversation>
> {
  declare _id: CreationOptional<number>;
  declare participant1: ForeignKey<number>;
  declare participant2: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare blackList: [boolean, boolean];
  declare favoriteList: [boolean, boolean];
}

export = Conversation;
