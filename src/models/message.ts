import { DataTypes, Model } from 'sequelize';
import type {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import type { Conversation, DB, Message, User } from 'types/models';

export default function Message(sequelize: Sequelize) {
  class Message extends _Message {
    static associate({ Conversation, User }: DB) {
      Message.belongsTo(User, { foreignKey: 'sender', targetKey: 'id' });
      Message.belongsTo(Conversation, {
        as: 'conversations',
        foreignKey: 'conversation',
        targetKey: '_id',
      });
    }
  }
  Message.init(
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
    },
  );
  return Message;
}

abstract class _Message extends Model<
  InferAttributes<_Message>,
  InferCreationAttributes<_Message>
> {
  declare body: string;

  declare _id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare sender: ForeignKey<User['id']>;
  declare conversation: ForeignKey<Conversation['_id']>;

  declare conversations?: NonAttribute<DB['Conversation'][]>;
  declare users?: NonAttribute<DB['User'][]>;

  declare static associations: {
    conversations: Association<Message, Conversation>;
    users: Association<Message, User>;
  };

  declare getConversation: BelongsToGetAssociationMixin<Conversation>;
  declare addConversation: BelongsToSetAssociationMixin<Conversation, number>;
  declare createConversation: BelongsToCreateAssociationMixin<Conversation>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;
}
