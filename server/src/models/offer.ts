import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import type { DB } from '../types/models';

const Offer = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Offer extends Model<
    InferAttributes<Offer>,
    InferCreationAttributes<Offer>
  > {
    declare text?: CreationOptional<string>;
    declare fileName?: CreationOptional<string>;
    declare originalFileName?: CreationOptional<string>;
    declare status?: CreationOptional<string>;

    declare id: CreationOptional<number>;
    declare userId: number;
    declare contestId: number;

    static associate({ User, Contest, Rating }: DB) {
      Offer.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Offer.belongsTo(Contest, { foreignKey: 'contestId', targetKey: 'id' });
      Offer.hasOne(Rating, { foreignKey: 'offerId', sourceKey: 'id' });
    }
  }
  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: false,
    },
  );
  return Offer;
};

export = Offer;
