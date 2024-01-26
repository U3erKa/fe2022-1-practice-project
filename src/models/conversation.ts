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
import type { Catalog, Conversation, DB, Message, User } from 'types/models';

export default function Conversation(sequelize: Sequelize) {
  class Conversation extends _Conversation {
    static associate({ Catalog, Message, User }: DB) {
      Conversation.hasMany(Message, {
        as: 'messages',
        foreignKey: 'conversation',
        sourceKey: '_id',
      });
      Conversation.belongsToMany(Catalog, {
        as: 'catalogs',
        foreignKey: 'conversationId',
        targetKey: '_id',
        through: 'catalogs_to_conversations',
      });
      Conversation.belongsToMany(User, {
        foreignKey: 'conversationId',
        targetKey: 'id',
        through: 'Users_to_conversations',
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: 'Users',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      participant2: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: 'Users',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      blackList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        validate: {
          isTuple,
        },
      },
      favoriteList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        validate: {
          isTuple,
        },
      },
      participants: {
        type: DataTypes.VIRTUAL,
        get() {
          return [this.participant1!, this.participant2!].sort(
            (participant1, participant2) => participant1 - participant2,
          ) as [number, number];
        },
        set(value) {
          isTuple(value);
          if (value.some((item) => typeof item !== 'number')) {
            throw new TypeError('participant ids must be numbers');
          }
          const [participant1, participant2] = value as [number, number];
          this.setDataValue('participant1', participant1);
          this.setDataValue('participant2', participant2);
        },
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
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
}

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
  declare participants: CreationOptional<
    [typeof this.participant1, typeof this.participant2]
  >;

  declare catalogs?: NonAttribute<DB['Catalog'][]>;
  declare messages?: NonAttribute<DB['Message'][]>;

  declare static associations: {
    catalogs: Association<Conversation, Catalog>;
    messages: Association<Conversation, Message>;
    participant1: Association<Conversation, User>;
    participant2: Association<Conversation, User>;
  };

  declare getMessages: HasManyGetAssociationsMixin<Message>;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare addMessages: HasManyAddAssociationsMixin<Message, number>;
  declare setMessages: HasManySetAssociationsMixin<Message, number>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
  declare hasMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countMessages: HasManyCountAssociationsMixin;
  declare createMessage: HasManyCreateAssociationMixin<Message, 'conversation'>;

  declare getCatalogs: BelongsToManyGetAssociationsMixin<Catalog>;
  declare addCatalog: BelongsToManyAddAssociationMixin<Catalog, number>;
  declare addCatalogs: BelongsToManyAddAssociationsMixin<Catalog, number>;
  declare setCatalogs: BelongsToManySetAssociationsMixin<Catalog, number>;
  declare removeCatalog: BelongsToManyRemoveAssociationMixin<Catalog, number>;
  declare removeCatalogs: BelongsToManyRemoveAssociationsMixin<Catalog, number>;
  declare hasCatalog: BelongsToManyHasAssociationMixin<Catalog, number>;
  declare hasCatalogs: BelongsToManyHasAssociationsMixin<Catalog, number>;
  declare countCatalogs: BelongsToManyCountAssociationsMixin;
  declare createCatalog: BelongsToManyCreateAssociationMixin<Catalog>;

  declare getParticipant1s: BelongsToManyGetAssociationsMixin<User>;
  declare addParticipant1: BelongsToManyAddAssociationMixin<User, number>;
  declare addParticipant1s: BelongsToManyAddAssociationsMixin<User, number>;
  declare setParticipant1s: BelongsToManySetAssociationsMixin<User, number>;
  declare removeParticipant1: BelongsToManyRemoveAssociationMixin<User, number>;
  declare removeParticipant1s: BelongsToManyRemoveAssociationsMixin<
    User,
    number
  >;
  declare hasParticipant1: BelongsToManyHasAssociationMixin<User, number>;
  declare hasParticipant1s: BelongsToManyHasAssociationsMixin<User, number>;
  declare countParticipant1s: BelongsToManyCountAssociationsMixin;
  declare createParticipant1: BelongsToManyCreateAssociationMixin<User>;

  declare getParticipant2s: BelongsToManyGetAssociationsMixin<User>;
  declare addParticipant2: BelongsToManyAddAssociationMixin<User, number>;
  declare addParticipant2s: BelongsToManyAddAssociationsMixin<User, number>;
  declare setParticipant2s: BelongsToManySetAssociationsMixin<User, number>;
  declare removeParticipant2: BelongsToManyRemoveAssociationMixin<User, number>;
  declare removeParticipant2s: BelongsToManyRemoveAssociationsMixin<
    User,
    number
  >;
  declare hasParticipant2: BelongsToManyHasAssociationMixin<User, number>;
  declare hasParticipant2s: BelongsToManyHasAssociationsMixin<User, number>;
  declare countParticipant2s: BelongsToManyCountAssociationsMixin;
  declare createParticipant2: BelongsToManyCreateAssociationMixin<User>;
}
