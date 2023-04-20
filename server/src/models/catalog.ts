import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  ForeignKey, CreationOptional, NonAttribute, Association,
  BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin,
} from 'sequelize';
import type { DB, User } from '../types/models';

const Catalog = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Catalog extends _Catalog {
    static associate({ Conversation, User }: DB) {
      Catalog.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Catalog.belongsToMany(Conversation, {
        as: 'conversations',
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

  declare getConversations: BelongsToManyGetAssociationsMixin<
    DB['Conversation']
  >;
  declare addConversation: BelongsToManyAddAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare addConversations: BelongsToManyAddAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare setConversations: BelongsToManySetAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare removeConversation: BelongsToManyRemoveAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare removeConversations: BelongsToManyRemoveAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare hasConversation: BelongsToManyHasAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare hasConversations: BelongsToManyHasAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare countConversations: BelongsToManyCountAssociationsMixin;
  declare createConversation: BelongsToManyCreateAssociationMixin<
    DB['Conversation'] & Model
  >;
}

export = Catalog;
