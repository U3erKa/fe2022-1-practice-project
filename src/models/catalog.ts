import { DataTypes, Model } from 'sequelize';
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
  Sequelize,
} from 'sequelize';
import type { Catalog, Conversation, DB, User } from 'types/models';

export default function Catalog(sequelize: Sequelize) {
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
}

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
    conversations: Association<Catalog, User>;
    users: Association<Catalog, User>;
  };

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare getChats: BelongsToManyGetAssociationsMixin<Conversation>;
  declare addChat: BelongsToManyAddAssociationMixin<Conversation, number>;
  declare addChats: BelongsToManyAddAssociationsMixin<Conversation, number>;
  declare setChats: BelongsToManySetAssociationsMixin<Conversation, number>;
  declare removeChat: BelongsToManyRemoveAssociationMixin<Conversation, number>;
  declare removeChats: BelongsToManyRemoveAssociationsMixin<
    Conversation,
    number
  >;
  declare hasChat: BelongsToManyHasAssociationMixin<Conversation, number>;
  declare hasChats: BelongsToManyHasAssociationsMixin<Conversation, number>;
  declare countChats: BelongsToManyCountAssociationsMixin;
  declare createChat: BelongsToManyCreateAssociationMixin<Conversation>;
}
