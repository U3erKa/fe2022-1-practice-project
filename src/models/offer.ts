import { Model } from 'sequelize';
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
  DataTypes as _DataTypes,
} from 'sequelize';
import type { Contest, DB, User } from 'types/models';

const Offer = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
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
    user: Association<DB['Offer'] & Model, DB['User'] & Model>;
    contest: Association<DB['Offer'] & Model, DB['Contest'] & Model>;
    rating: Association<DB['Offer'] & Model, DB['Rating'] & Model>;
  };

  declare createUser: BelongsToCreateAssociationMixin<DB['User'] & Model>;
  declare getUser: BelongsToGetAssociationMixin<DB['User']>;
  declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;

  declare createContest: BelongsToCreateAssociationMixin<DB['Contest'] & Model>;
  declare getContest: BelongsToGetAssociationMixin<DB['Contest']>;
  declare addContest: BelongsToSetAssociationMixin<DB['Contest'], number>;

  declare createRating: HasOneCreateAssociationMixin<DB['Rating'] & Model>;
  declare getRating: HasOneGetAssociationMixin<DB['Rating']>;
  declare addRating: HasOneSetAssociationMixin<DB['Rating'], number>;
}

export default Offer;
