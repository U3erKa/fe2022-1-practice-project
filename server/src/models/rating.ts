import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
} from 'sequelize';
import type { DB } from '../types/models';

const Rating = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Rating extends Model<
    InferAttributes<Rating>,
    InferCreationAttributes<Rating>
  > {
    declare mark: number;

    declare offerId: number;
    declare userId: number;

    static associate({ User, Offer }: DB) {
      Rating.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Rating.belongsTo(Offer, { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Rating.init(
    {
      offerId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      mark: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: 'Rating',
      timestamps: false,
    },
  );
  return Rating;
};

export = Rating;
