import { Model } from 'sequelize';
import type {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  DataTypes as _DataTypes,
} from 'sequelize';
import type { DB, User } from '../types/models';

const Catalog = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Catalog extends _Catalog {
    static associate({ Conversation, User }: DB) {
      Catalog.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Catalog.belongsToMany(Conversation, {
        as: 'chats',
        through: 'catalogs_to_conversations',
        foreignKey: 'catalogId',
        targetKey: '_id',
      });
    }
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
      tableName: 'catalogs',
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

  declare conversations?: NonAttribute<DB['Conversation'][]>;
  declare users?: NonAttribute<DB['User'][]>;

  declare static associations: {
    conversations: Association<
      DB['Catalog'] & Model,
      DB['Conversation'] & Model
    >;
    users: Association<DB['Catalog'] & Model, DB['User'] & Model>;
  };

  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;
  declare createUser: BelongsToCreateAssociationMixin<DB['User'] & Model>;

  declare getChats: BelongsToManyGetAssociationsMixin<DB['Conversation']>;
  declare addChat: BelongsToManyAddAssociationMixin<DB['Conversation'], number>;
  declare addChats: BelongsToManyAddAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare setChats: BelongsToManySetAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare removeChat: BelongsToManyRemoveAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare removeChats: BelongsToManyRemoveAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare hasChat: BelongsToManyHasAssociationMixin<DB['Conversation'], number>;
  declare hasChats: BelongsToManyHasAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare countChats: BelongsToManyCountAssociationsMixin;
  declare createChat: BelongsToManyCreateAssociationMixin<
    DB['Conversation'] & Model
  >;
}

export default Catalog;
