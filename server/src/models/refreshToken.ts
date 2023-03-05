import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import type { DB } from '../types/models';

const RefreshToken = (
  sequelize: DB['sequelize'],
  DataTypes: typeof _DataTypes,
) => {
  class RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
  > {
    declare token: string;

    declare id: CreationOptional<number>;
    declare userId: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

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

export = RefreshToken;
