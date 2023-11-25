import { DataTypes, Model } from 'sequelize';
import type {
  Association,
  CreationOptional,
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
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'constants/backend';
import type { DB, User as __User } from 'types/models';

const hashPassword = async (user: __User) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = passwordHash;
  }
};

const User = (sequelize: Sequelize) => {
  class User extends _User {
    async comparePassword(password: string | Buffer) {
      return await bcrypt.compare(password, this.password);
    }

    static associate({
      Offer,
      Catalog,
      Contest,
      Conversation,
      Event,
      Message,
      Rating,
      RefreshToken,
    }: DB) {
      const foreignKey = 'userId';
      const sourceKey = 'id';

      User.hasMany(Offer, { foreignKey, sourceKey });
      User.hasMany(Catalog, { foreignKey, sourceKey });
      User.hasMany(Contest, { foreignKey, sourceKey });
      User.hasMany(Event, { foreignKey, sourceKey });
      User.hasMany(Message, { foreignKey: 'sender', sourceKey });
      User.hasMany(Rating, { foreignKey, sourceKey });
      User.hasMany(RefreshToken, { foreignKey, sourceKey });
      User.hasMany(Conversation, { foreignKey: 'participant1', sourceKey });
      User.hasMany(Conversation, { foreignKey: 'participant2', sourceKey });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    },
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};

abstract class _User extends Model<
  InferAttributes<_User>,
  InferCreationAttributes<_User>
> {
  declare firstName: string;
  declare lastName: string;
  declare displayName: string;
  declare password: string;
  declare email: string;
  declare avatar: CreationOptional<string>;
  declare role: 'customer' | 'creator' | 'moderator';
  declare balance: CreationOptional<number>;
  declare accessToken?: CreationOptional<string>;
  declare rating: CreationOptional<number>;

  declare id: CreationOptional<number>;

  declare catalogs?: NonAttribute<DB['Catalog'][]>;
  declare contests?: NonAttribute<DB['Contest'][]>;
  declare events?: NonAttribute<DB['Event'][]>;
  declare conversations?: NonAttribute<DB['Conversation'][]>;
  declare messages?: NonAttribute<DB['Message'][]>;
  declare offers?: NonAttribute<DB['Offer'][]>;
  declare ratings?: NonAttribute<DB['Rating'][]>;
  declare refreshTokens?: NonAttribute<DB['RefreshToken'][]>;

  declare static associations: {
    catalogs: Association<DB['User'] & Model, DB['Catalog'] & Model>;
    contests: Association<DB['User'] & Model, DB['Contest'] & Model>;
    events: Association<DB['User'] & Model, DB['Event'] & Model>;
    conversations: Association<DB['User'] & Model, DB['Conversation'] & Model>;
    messages: Association<DB['User'] & Model, DB['Message'] & Model>;
    offers: Association<DB['User'] & Model, DB['Offer'] & Model>;
    ratings: Association<DB['User'] & Model, DB['Rating'] & Model>;
    refreshTokens: Association<DB['User'] & Model, DB['RefreshToken'] & Model>;
  };

  declare getOffers: HasManyGetAssociationsMixin<DB['Offer']>;
  declare addOffer: HasManyAddAssociationMixin<DB['Offer'], number>;
  declare addOffers: HasManyAddAssociationsMixin<DB['Offer'], number>;
  declare setOffers: HasManySetAssociationsMixin<DB['Offer'], number>;
  declare removeOffer: HasManyRemoveAssociationMixin<DB['Offer'], number>;
  declare removeOffers: HasManyRemoveAssociationsMixin<DB['Offer'], number>;
  declare hasOffer: HasManyHasAssociationMixin<DB['Offer'], number>;
  declare hasOffers: HasManyHasAssociationsMixin<DB['Offer'], number>;
  declare countOffers: HasManyCountAssociationsMixin;
  declare createOffer: HasManyCreateAssociationMixin<
    DB['Offer'] & Model,
    'userId'
  >;

  declare getCatalogs: HasManyGetAssociationsMixin<DB['Catalog']>;
  declare addCatalog: HasManyAddAssociationMixin<DB['Catalog'], number>;
  declare addCatalogs: HasManyAddAssociationsMixin<DB['Catalog'], number>;
  declare setCatalogs: HasManySetAssociationsMixin<DB['Catalog'], number>;
  declare removeCatalog: HasManyRemoveAssociationMixin<DB['Catalog'], number>;
  declare removeCatalogs: HasManyRemoveAssociationsMixin<DB['Catalog'], number>;
  declare hasCatalog: HasManyHasAssociationMixin<DB['Catalog'], number>;
  declare hasCatalogs: HasManyHasAssociationsMixin<DB['Catalog'], number>;
  declare countCatalogs: HasManyCountAssociationsMixin;
  declare createCatalog: HasManyCreateAssociationMixin<
    DB['Catalog'] & Model,
    'userId'
  >;

  declare getContests: HasManyGetAssociationsMixin<DB['Contest']>;
  declare addContest: HasManyAddAssociationMixin<DB['Contest'], number>;
  declare addContests: HasManyAddAssociationsMixin<DB['Contest'], number>;
  declare setContests: HasManySetAssociationsMixin<DB['Contest'], number>;
  declare removeContest: HasManyRemoveAssociationMixin<DB['Contest'], number>;
  declare removeContests: HasManyRemoveAssociationsMixin<DB['Contest'], number>;
  declare hasContest: HasManyHasAssociationMixin<DB['Contest'], number>;
  declare hasContests: HasManyHasAssociationsMixin<DB['Contest'], number>;
  declare countContests: HasManyCountAssociationsMixin;
  declare createContest: HasManyCreateAssociationMixin<
    DB['Contest'] & Model,
    'userId'
  >;

  declare getEvents: HasManyGetAssociationsMixin<DB['Event']>;
  declare addEvent: HasManyAddAssociationMixin<DB['Event'], number>;
  declare addEvents: HasManyAddAssociationsMixin<DB['Event'], number>;
  declare setEvents: HasManySetAssociationsMixin<DB['Event'], number>;
  declare removeEvent: HasManyRemoveAssociationMixin<DB['Event'], number>;
  declare removeEvents: HasManyRemoveAssociationsMixin<DB['Event'], number>;
  declare hasEvent: HasManyHasAssociationMixin<DB['Event'], number>;
  declare hasEvents: HasManyHasAssociationsMixin<DB['Event'], number>;
  declare countEvents: HasManyCountAssociationsMixin;
  declare createEvent: HasManyCreateAssociationMixin<
    DB['Event'] & Model,
    'userId'
  >;

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
    'sender'
  >;

  declare getRatings: HasManyGetAssociationsMixin<DB['Rating']>;
  declare addRating: HasManyAddAssociationMixin<DB['Rating'], number>;
  declare addRatings: HasManyAddAssociationsMixin<DB['Rating'], number>;
  declare setRatings: HasManySetAssociationsMixin<DB['Rating'], number>;
  declare removeRating: HasManyRemoveAssociationMixin<DB['Rating'], number>;
  declare removeRatings: HasManyRemoveAssociationsMixin<DB['Rating'], number>;
  declare hasRating: HasManyHasAssociationMixin<DB['Rating'], number>;
  declare hasRatings: HasManyHasAssociationsMixin<DB['Rating'], number>;
  declare countRatings: HasManyCountAssociationsMixin;
  declare createRating: HasManyCreateAssociationMixin<
    DB['Rating'] & Model,
    'userId'
  >;

  declare getRefreshTokens: HasManyGetAssociationsMixin<DB['RefreshToken']>;
  declare addRefreshToken: HasManyAddAssociationMixin<
    DB['RefreshToken'],
    number
  >;
  declare addRefreshTokens: HasManyAddAssociationsMixin<
    DB['RefreshToken'],
    number
  >;
  declare setRefreshTokens: HasManySetAssociationsMixin<
    DB['RefreshToken'],
    number
  >;
  declare removeRefreshToken: HasManyRemoveAssociationMixin<
    DB['RefreshToken'],
    number
  >;
  declare removeRefreshTokens: HasManyRemoveAssociationsMixin<
    DB['RefreshToken'],
    number
  >;
  declare hasRefreshToken: HasManyHasAssociationMixin<
    DB['RefreshToken'],
    number
  >;
  declare hasRefreshTokens: HasManyHasAssociationsMixin<
    DB['RefreshToken'],
    number
  >;
  declare countRefreshTokens: HasManyCountAssociationsMixin;
  declare createRefreshToken: HasManyCreateAssociationMixin<
    DB['RefreshToken'] & Model,
    'userId'
  >;

  declare getConversations: HasManyGetAssociationsMixin<DB['Conversation']>;
  declare addConversation: HasManyAddAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare addConversations: HasManyAddAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare setConversations: HasManySetAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare removeConversation: HasManyRemoveAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare removeConversations: HasManyRemoveAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare hasConversation: HasManyHasAssociationMixin<
    DB['Conversation'],
    number
  >;
  declare hasConversations: HasManyHasAssociationsMixin<
    DB['Conversation'],
    number
  >;
  declare countConversations: HasManyCountAssociationsMixin;
  declare createConversation: HasManyCreateAssociationMixin<
    DB['Conversation'] & Model
  >;
}

export default User;
