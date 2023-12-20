import { DataTypes, Model } from 'sequelize';
import type {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  ForeignKey,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { OFFER_STATUS_PENDING } from 'constants/general';
import type { Contest, DB, Offer, Rating, User } from 'types/models';

export default function Offer(sequelize: Sequelize) {
  class Offer extends _Offer {
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
        defaultValue: OFFER_STATUS_PENDING,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: false,
    },
  );
  return Offer;
}

abstract class _Offer extends Model<
  InferAttributes<_Offer>,
  InferCreationAttributes<_Offer>
> {
  declare text?: CreationOptional<string>;
  declare fileName?: CreationOptional<string>;
  declare originalFileName?: CreationOptional<string>;
  declare status?: CreationOptional<string>;

  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare contestId: ForeignKey<Contest['id']>;

  declare user?: NonAttribute<DB['User'][]>;
  declare contest?: NonAttribute<DB['Contest'][]>;
  declare rating?: NonAttribute<DB['Rating'][]>;

  declare static associations: {
    user: Association<Offer, User>;
    contest: Association<Offer, Contest>;
    rating: Association<Offer, Rating>;
  };

  declare createUser: BelongsToCreateAssociationMixin<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;

  declare createContest: BelongsToCreateAssociationMixin<Contest>;
  declare getContest: BelongsToGetAssociationMixin<Contest>;
  declare addContest: BelongsToSetAssociationMixin<Contest, number>;

  declare createRating: HasOneCreateAssociationMixin<Rating>;
  declare getRating: HasOneGetAssociationMixin<Rating>;
  declare addRating: HasOneSetAssociationMixin<Rating, number>;
}
