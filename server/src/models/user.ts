import { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import type { DB } from '../types/models';

const hashPassword = async (user: InstanceType<DB['User']>) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = passwordHash;
  }
};

const User = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
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

    async comparePassword(password) {
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

export = User;
