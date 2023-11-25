import { DataTypes, Model } from 'sequelize';
import type {
  Association,
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
  CreationOptional,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { isTuple } from 'utils/functions';
import type { DB, User } from 'types/models';

const Conversation = (sequelize: Sequelize) => {
  class Conversation extends _Conversation {
    static associate({ Catalog, Message, User }: DB) {
      Conversation.hasMany(Message, {
        as: 'messages',
        foreignKey: 'conversation',
        sourceKey: '_id',
      });
      Conversation.belongsToMany(Catalog, {
        as: 'catalogs',
        through: 'catalogs_to_conversations',
        foreignKey: 'conversationId',
        targetKey: '_id',
      });
      Conversation.belongsToMany(User, {
        through: 'Users_to_conversations',
        foreignKey: 'conversationId',
        targetKey: 'id',
      });
    }
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
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      participant2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      tableName: 'conversations',
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
  declare participant1?: ForeignKey<User['id']>;
  declare participant2?: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare blackList: [boolean, boolean];
  declare favoriteList: [boolean, boolean];

  declare catalogs?: NonAttribute<DB['Catalog'][]>;
  declare messages?: NonAttribute<DB['Message'][]>;

  declare static associations: {
    catalogs: Association<DB['Conversation'] & Model, DB['Catalog'] & Model>;
    messages: Association<DB['Conversation'] & Model, DB['Message'] & Model>;
    participant1: Association<DB['Conversation'] & Model, DB['User'] & Model>;
    participant2: Association<DB['Conversation'] & Model, DB['User'] & Model>;
  };

  declare getMessages: HasManyGetAssociationsMixin<DB['Message']>;
  declare addMessage: HasManyAddAssociationMixin<DB['Message'], number>;
  declare addMessages: HasManyAddAssociationsMixin<DB['Message'], number>;
  declare setMessages: HasManySetAssociationsMixin<DB['Message'], number>;
  declare removeMessage: HasManyRemoveAssociationMixin<DB['Message'], number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<DB['Message'], number>;
  declare hasMessage: HasManyHasAssociationMixin<DB['Message'], number>;
  declare hasMessages: HasManyHasAssociationsMixin<DB['Message'], number>;
  declare countMessages: HasManyCountAssociationsMixin;
  declare createMessage: HasManyCreateAssociationMixin<
    DB['Message'] & Model,
    'conversation'
  >;

  declare getCatalogs: BelongsToManyGetAssociationsMixin<DB['Catalog']>;
  declare addCatalog: BelongsToManyAddAssociationMixin<DB['Catalog'], number>;
  declare addCatalogs: BelongsToManyAddAssociationsMixin<DB['Catalog'], number>;
  declare setCatalogs: BelongsToManySetAssociationsMixin<DB['Catalog'], number>;
  declare removeCatalog: BelongsToManyRemoveAssociationMixin<
    DB['Catalog'],
    number
  >;
  declare removeCatalogs: BelongsToManyRemoveAssociationsMixin<
    DB['Catalog'],
    number
  >;
  declare hasCatalog: BelongsToManyHasAssociationMixin<DB['Catalog'], number>;
  declare hasCatalogs: BelongsToManyHasAssociationsMixin<DB['Catalog'], number>;
  declare countCatalogs: BelongsToManyCountAssociationsMixin;
  declare createCatalog: BelongsToManyCreateAssociationMixin<
    DB['Catalog'] & Model
  >;

  declare getParticipant1s: BelongsToManyGetAssociationsMixin<DB['User']>;
  declare addParticipant1: BelongsToManyAddAssociationMixin<DB['User'], number>;
  declare addParticipant1s: BelongsToManyAddAssociationsMixin<
    DB['User'],
    number
  >;
  declare setParticipant1s: BelongsToManySetAssociationsMixin<
    DB['User'],
    number
  >;
  declare removeParticipant1: BelongsToManyRemoveAssociationMixin<
    DB['User'],
    number
  >;
  declare removeParticipant1s: BelongsToManyRemoveAssociationsMixin<
    DB['User'],
    number
  >;
  declare hasParticipant1: BelongsToManyHasAssociationMixin<DB['User'], number>;
  declare hasParticipant1s: BelongsToManyHasAssociationsMixin<
    DB['User'],
    number
  >;
  declare countParticipant1s: BelongsToManyCountAssociationsMixin;
  declare createParticipant1: BelongsToManyCreateAssociationMixin<
    DB['User'] & Model
  >;

  declare getParticipant2s: BelongsToManyGetAssociationsMixin<DB['User']>;
  declare addParticipant2: BelongsToManyAddAssociationMixin<DB['User'], number>;
  declare addParticipant2s: BelongsToManyAddAssociationsMixin<
    DB['User'],
    number
  >;
  declare setParticipant2s: BelongsToManySetAssociationsMixin<
    DB['User'],
    number
  >;
  declare removeParticipant2: BelongsToManyRemoveAssociationMixin<
    DB['User'],
    number
  >;
  declare removeParticipant2s: BelongsToManyRemoveAssociationsMixin<
    DB['User'],
    number
  >;
  declare hasParticipant2: BelongsToManyHasAssociationMixin<DB['User'], number>;
  declare hasParticipant2s: BelongsToManyHasAssociationsMixin<
    DB['User'],
    number
  >;
  declare countParticipant2s: BelongsToManyCountAssociationsMixin;
  declare createParticipant2: BelongsToManyCreateAssociationMixin<
    DB['User'] & Model
  >;
}

export default Conversation;
