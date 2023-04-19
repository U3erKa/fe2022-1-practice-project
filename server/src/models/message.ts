import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  CreationOptional, ForeignKey, NonAttribute, Association,
  BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToCreateAssociationMixin,
} from 'sequelize';
import type { Conversation, DB, User } from '../types/models';

const Message = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Message extends _Message {
    static associate({ Conversation, User }: DB) {
      Message.belongsTo(User, { foreignKey: 'sender', targetKey: 'id' });
      Message.belongsTo(Conversation, {
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
};

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
    conversations: Association<
      DB['Message'] & Model,
      DB['Conversation'] & Model
    >;
    users: Association<DB['Message'] & Model, DB['User'] & Model>;
  };

  declare getConversation: BelongsToGetAssociationMixin<DB['Conversation']>;
  declare addConversation: BelongsToSetAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare createConversation: BelongsToCreateAssociationMixin<
    DB['Conversation'] & Model
  >;

  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;
  declare createUser: BelongsToCreateAssociationMixin<DB['User'] & Model>;
}

export = Message;
