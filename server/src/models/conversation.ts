import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  ForeignKey, CreationOptional, NonAttribute, Association,
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin, HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin, HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin,
} from 'sequelize';
import { isTuple } from '../validationSchemes/functions';
import type { DB } from '../types/models';

const Conversation = (
  sequelize: DB['sequelize'],
  DataTypes: typeof _DataTypes,
) => {
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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare blackList: [boolean, boolean];
  declare favoriteList: [boolean, boolean];

  declare catalogs?: NonAttribute<DB['Catalog'][]>;
  declare messages?: NonAttribute<DB['Message'][]>;
  declare participant1?: NonAttribute<DB['User'][]>;
  declare participant2?: NonAttribute<DB['User'][]>;

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

export = Conversation;
