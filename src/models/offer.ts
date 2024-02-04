import {
  DataTypes,
  Model,
  type Association,
  type BelongsToCreateAssociationMixin,
  type BelongsToGetAssociationMixin,
  type BelongsToSetAssociationMixin,
  type CreationOptional,
  type ForeignKey,
  type HasOneCreateAssociationMixin,
  type HasOneGetAssociationMixin,
  type HasOneSetAssociationMixin,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type Sequelize,
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
      contestId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fileName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      originalFileName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: OFFER_STATUS_PENDING,
      },
      text: {
        allowNull: true,
        type: DataTypes.STRING,
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
