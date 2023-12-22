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
import type { DB, RefreshToken, User } from 'types/models';

export default function RefreshToken(sequelize: Sequelize) {
  class RefreshToken extends _RefreshToken {
    static associate({ User }: DB) {
      RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  RefreshToken.init(
    // @ts-expect-error
    {
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    },
  );
  return RefreshToken;
}

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
    user: Association<RefreshToken, User>;
  };

  declare createUser: BelongsToCreateAssociationMixin<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;
}
