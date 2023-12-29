import bcrypt from 'bcrypt';
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
import { SALT_ROUNDS } from 'constants/backend';
import {
  ANONYM_IMAGE_NAME,
  CREATOR,
  CUSTOMER,
  MODERATOR,
} from 'constants/general';
import type {
  Catalog,
  Contest,
  Conversation,
  DB,
  Event,
  Message,
  Offer,
  Rating,
  RefreshToken,
  User,
} from 'types/models';

const hashPassword = async (user: User) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = passwordHash;
  }
};

export default function User(sequelize: Sequelize) {
  class User extends _User {
    async comparePassword(password: Buffer | string) {
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
      accessToken: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      avatar: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ANONYM_IMAGE_NAME,
      },
      balance: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: { min: 0 },
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      rating: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM(CUSTOMER, CREATOR),
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
}

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
  declare role: typeof CREATOR | typeof CUSTOMER | typeof MODERATOR;
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
    catalogs: Association<User, Catalog>;
    contests: Association<User, Contest>;
    events: Association<User, Event>;
    conversations: Association<User, Conversation>;
    messages: Association<User, Message>;
    offers: Association<User, Offer>;
    ratings: Association<User, Rating>;
    refreshTokens: Association<User, RefreshToken>;
  };

  declare getOffers: HasManyGetAssociationsMixin<Offer>;
  declare addOffer: HasManyAddAssociationMixin<Offer, number>;
  declare addOffers: HasManyAddAssociationsMixin<Offer, number>;
  declare setOffers: HasManySetAssociationsMixin<Offer, number>;
  declare removeOffer: HasManyRemoveAssociationMixin<Offer, number>;
  declare removeOffers: HasManyRemoveAssociationsMixin<Offer, number>;
  declare hasOffer: HasManyHasAssociationMixin<Offer, number>;
  declare hasOffers: HasManyHasAssociationsMixin<Offer, number>;
  declare countOffers: HasManyCountAssociationsMixin;
  declare createOffer: HasManyCreateAssociationMixin<Offer, 'userId'>;

  declare getCatalogs: HasManyGetAssociationsMixin<Catalog>;
  declare addCatalog: HasManyAddAssociationMixin<Catalog, number>;
  declare addCatalogs: HasManyAddAssociationsMixin<Catalog, number>;
  declare setCatalogs: HasManySetAssociationsMixin<Catalog, number>;
  declare removeCatalog: HasManyRemoveAssociationMixin<Catalog, number>;
  declare removeCatalogs: HasManyRemoveAssociationsMixin<Catalog, number>;
  declare hasCatalog: HasManyHasAssociationMixin<Catalog, number>;
  declare hasCatalogs: HasManyHasAssociationsMixin<Catalog, number>;
  declare countCatalogs: HasManyCountAssociationsMixin;
  declare createCatalog: HasManyCreateAssociationMixin<Catalog, 'userId'>;

  declare getContests: HasManyGetAssociationsMixin<Contest>;
  declare addContest: HasManyAddAssociationMixin<Contest, number>;
  declare addContests: HasManyAddAssociationsMixin<Contest, number>;
  declare setContests: HasManySetAssociationsMixin<Contest, number>;
  declare removeContest: HasManyRemoveAssociationMixin<Contest, number>;
  declare removeContests: HasManyRemoveAssociationsMixin<Contest, number>;
  declare hasContest: HasManyHasAssociationMixin<Contest, number>;
  declare hasContests: HasManyHasAssociationsMixin<Contest, number>;
  declare countContests: HasManyCountAssociationsMixin;
  declare createContest: HasManyCreateAssociationMixin<Contest, 'userId'>;

  declare getEvents: HasManyGetAssociationsMixin<Event>;
  declare addEvent: HasManyAddAssociationMixin<Event, number>;
  declare addEvents: HasManyAddAssociationsMixin<Event, number>;
  declare setEvents: HasManySetAssociationsMixin<Event, number>;
  declare removeEvent: HasManyRemoveAssociationMixin<Event, number>;
  declare removeEvents: HasManyRemoveAssociationsMixin<Event, number>;
  declare hasEvent: HasManyHasAssociationMixin<Event, number>;
  declare hasEvents: HasManyHasAssociationsMixin<Event, number>;
  declare countEvents: HasManyCountAssociationsMixin;
  declare createEvent: HasManyCreateAssociationMixin<Event, 'userId'>;

  declare getMessages: HasManyGetAssociationsMixin<Message>;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare addMessages: HasManyAddAssociationsMixin<Message, number>;
  declare setMessages: HasManySetAssociationsMixin<Message, number>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
  declare hasMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countMessages: HasManyCountAssociationsMixin;
  declare createMessage: HasManyCreateAssociationMixin<Message, 'sender'>;

  declare getRatings: HasManyGetAssociationsMixin<Rating>;
  declare addRating: HasManyAddAssociationMixin<Rating, number>;
  declare addRatings: HasManyAddAssociationsMixin<Rating, number>;
  declare setRatings: HasManySetAssociationsMixin<Rating, number>;
  declare removeRating: HasManyRemoveAssociationMixin<Rating, number>;
  declare removeRatings: HasManyRemoveAssociationsMixin<Rating, number>;
  declare hasRating: HasManyHasAssociationMixin<Rating, number>;
  declare hasRatings: HasManyHasAssociationsMixin<Rating, number>;
  declare countRatings: HasManyCountAssociationsMixin;
  declare createRating: HasManyCreateAssociationMixin<Rating, 'userId'>;

  declare getRefreshTokens: HasManyGetAssociationsMixin<RefreshToken>;
  declare addRefreshToken: HasManyAddAssociationMixin<RefreshToken, number>;
  declare addRefreshTokens: HasManyAddAssociationsMixin<RefreshToken, number>;
  declare setRefreshTokens: HasManySetAssociationsMixin<RefreshToken, number>;
  declare removeRefreshToken: HasManyRemoveAssociationMixin<
    RefreshToken,
    number
  >;
  declare removeRefreshTokens: HasManyRemoveAssociationsMixin<
    RefreshToken,
    number
  >;
  declare hasRefreshToken: HasManyHasAssociationMixin<RefreshToken, number>;
  declare hasRefreshTokens: HasManyHasAssociationsMixin<RefreshToken, number>;
  declare countRefreshTokens: HasManyCountAssociationsMixin;
  declare createRefreshToken: HasManyCreateAssociationMixin<
    RefreshToken,
    'userId'
  >;

  declare getConversations: HasManyGetAssociationsMixin<Conversation>;
  declare addConversation: HasManyAddAssociationMixin<Conversation, number>;
  declare addConversations: HasManyAddAssociationsMixin<Conversation, number>;
  declare setConversations: HasManySetAssociationsMixin<Conversation, number>;
  declare removeConversation: HasManyRemoveAssociationMixin<
    Conversation,
    number
  >;
  declare removeConversations: HasManyRemoveAssociationsMixin<
    Conversation,
    number
  >;
  declare hasConversation: HasManyHasAssociationMixin<Conversation, number>;
  declare hasConversations: HasManyHasAssociationsMixin<Conversation, number>;
  declare countConversations: HasManyCountAssociationsMixin;
  declare createConversation: HasManyCreateAssociationMixin<Conversation>;
}
