import { Model } from 'sequelize';
import type {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
  DataTypes as _DataTypes,
} from 'sequelize';
import type { DB, Offer, User } from '../types/models';

const Rating = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
  class Rating extends _Rating {
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

abstract class _Rating extends Model<
  InferAttributes<_Rating>,
  InferCreationAttributes<_Rating>
> {
  declare mark: number;

  declare offerId: ForeignKey<Offer['id']>;
  declare userId: ForeignKey<User['id']>;

  declare user?: NonAttribute<DB['User'][]>;
  declare offer?: NonAttribute<DB['Offer'][]>;

  declare static associations: {
    user: Association<DB['Rating'] & Model, DB['User'] & Model>;
    offer: Association<DB['Rating'] & Model, DB['Offer'] & Model>;
  };

  declare createUser: BelongsToCreateAssociationMixin<DB['User'] & Model>;
  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;

  declare createOffer: BelongsToCreateAssociationMixin<DB['Offer'] & Model>;
  declare getOffer: BelongsToGetAssociationMixin<DB['Offer']>;
  declare addOffer: BelongsToSetAssociationMixin<DB['Offer'], number>;
}

export default Rating;
