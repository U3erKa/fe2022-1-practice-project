import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
  NonAttribute, ForeignKey, Association,
  BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
} from 'sequelize';
import type { DB, User } from '../types/models';

const RefreshToken = (
  sequelize: DB['sequelize'],
  DataTypes: typeof _DataTypes,
) => {
  class RefreshToken extends _RefreshToken {
    static associate({ User }: DB) {
      RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  RefreshToken.init(
    // @ts-expect-error
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    },
  );
  return RefreshToken;
};

abstract class _RefreshToken extends Model<
  InferAttributes<_RefreshToken>,
  InferCreationAttributes<_RefreshToken>
> {
  declare token: string;

  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare user?: NonAttribute<DB['User'][]>;

  declare static associations: {
    user: Association<DB['RefreshToken'], DB['User']>;
  };

  declare createUser: BelongsToCreateAssociationMixin<DB['User']>;
  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;
}

export = RefreshToken;
