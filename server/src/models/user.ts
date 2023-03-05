import { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
  NonAttribute, Association,
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin, HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin, HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
} from 'sequelize';
import type { DB, User } from '../types/models';

const hashPassword = async (user: User) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = passwordHash;
  }
};

const User = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class User extends _User {
    async comparePassword(password: string | Buffer) {
      return bcrypt.compare(password, this.password);
    }
    static associate({ Offer, Contest, Rating, RefreshToken }: DB) {
      User.hasMany(Offer, { foreignKey: 'userId', sourceKey: 'id' });
      User.hasMany(Contest, { foreignKey: 'userId', sourceKey: 'id' });
      User.hasMany(Rating, { foreignKey: 'userId', sourceKey: 'id' });
      User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'id' });
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
  declare avatar: string;
  declare role: 'customer' | 'creator';
  declare balance: number;
  declare accessToken?: CreationOptional<string>;
  declare rating: number;

  declare id: CreationOptional<number>;

  declare offers?: NonAttribute<DB['Offer'][]>;
  declare contests?: NonAttribute<DB['Contest'][]>;
  declare ratings?: NonAttribute<DB['Rating'][]>;
  declare refreshTokens?: NonAttribute<DB['RefreshToken'][]>;

  declare static associations: {
    offers: Association<DB['User'], DB['Offer']>;
    contests: Association<DB['User'], DB['Contest']>;
    ratings: Association<DB['User'], DB['Rating']>;
    refreshTokens: Association<DB['User'], DB['RefreshToken']>;
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
  declare createOffer: HasManyCreateAssociationMixin<DB['Offer'], 'userId'>;

  declare getContests: HasManyGetAssociationsMixin<DB['Contest']>;
  declare addContest: HasManyAddAssociationMixin<DB['Contest'], number>;
  declare addContests: HasManyAddAssociationsMixin<DB['Contest'], number>;
  declare setContests: HasManySetAssociationsMixin<DB['Contest'], number>;
  declare removeContest: HasManyRemoveAssociationMixin<DB['Contest'], number>;
  declare removeContests: HasManyRemoveAssociationsMixin<DB['Contest'], number>;
  declare hasContest: HasManyHasAssociationMixin<DB['Contest'], number>;
  declare hasContests: HasManyHasAssociationsMixin<DB['Contest'], number>;
  declare countContests: HasManyCountAssociationsMixin;
  declare createContest: HasManyCreateAssociationMixin<DB['Contest'], 'userId'>;

  declare getRatings: HasManyGetAssociationsMixin<DB['Rating']>;
  declare addRating: HasManyAddAssociationMixin<DB['Rating'], number>;
  declare addRatings: HasManyAddAssociationsMixin<DB['Rating'], number>;
  declare setRatings: HasManySetAssociationsMixin<DB['Rating'], number>;
  declare removeRating: HasManyRemoveAssociationMixin<DB['Rating'], number>;
  declare removeRatings: HasManyRemoveAssociationsMixin<DB['Rating'], number>;
  declare hasRating: HasManyHasAssociationMixin<DB['Rating'], number>;
  declare hasRatings: HasManyHasAssociationsMixin<DB['Rating'], number>;
  declare countRatings: HasManyCountAssociationsMixin;
  declare createRating: HasManyCreateAssociationMixin<DB['Rating'], 'userId'>;

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
    DB['RefreshToken'],
    'userId'
  >;
}

export = User;
