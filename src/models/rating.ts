import { DataTypes, Model } from 'sequelize';
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
} from 'sequelize';
import type { DB, Offer, Rating, User } from 'types/models';

export default function Rating(sequelize: Sequelize) {
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
}

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
    user: Association<Rating, User>;
    offer: Association<Rating, Offer>;
  };

  declare createUser: BelongsToCreateAssociationMixin<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;

  declare createOffer: BelongsToCreateAssociationMixin<Offer>;
  declare getOffer: BelongsToGetAssociationMixin<Offer>;
  declare addOffer: BelongsToSetAssociationMixin<Offer, number>;
}
