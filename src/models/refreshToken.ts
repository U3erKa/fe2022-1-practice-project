import { Model } from 'sequelize';
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
  DataTypes as _DataTypes,
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
    user: Association<DB['RefreshToken'] & Model, DB['User'] & Model>;
  };

  declare createUser: BelongsToCreateAssociationMixin<DB['User'] & Model>;
  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;
}

export default RefreshToken;
