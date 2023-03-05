import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
  NonAttribute, ForeignKey, Association,
  BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
  HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin,
} from 'sequelize';
import type { DB } from '../types/models';

const Offer = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Offer extends Model<
    InferAttributes<Offer>,
    InferCreationAttributes<Offer>
  > {
    static associate({ User, Contest, Rating }: DB) {
      Offer.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Offer.belongsTo(Contest, { foreignKey: 'contestId', targetKey: 'id' });
      Offer.hasOne(Rating, { foreignKey: 'offerId', sourceKey: 'id' });
    }

    //#region Model declarations
    declare text?: CreationOptional<string>;
    declare fileName?: CreationOptional<string>;
    declare originalFileName?: CreationOptional<string>;
    declare status?: CreationOptional<string>;

    declare id: CreationOptional<number>;
    declare userId: ForeignKey<InstanceType<DB['User']>['id']>;
    declare contestId: ForeignKey<InstanceType<DB['Contest']>['id']>;

    declare user?: NonAttribute<DB['User'][]>;
    declare contest?: NonAttribute<DB['Contest'][]>;
    declare rating?: NonAttribute<DB['Rating'][]>;

    declare static associations: {
      user: Association<DB['Offer'], DB['User']>;
      contest: Association<DB['Offer'], DB['Contest']>;
      rating: Association<DB['Offer'], DB['Rating']>;
    };

    declare createUser: BelongsToCreateAssociationMixin<DB['User']>;
    declare getUser: BelongsToGetAssociationMixin<DB['User']>;
    declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;

    declare createContest: BelongsToCreateAssociationMixin<DB['Contest']>;
    declare getContest: BelongsToGetAssociationMixin<DB['Contest']>;
    declare addContest: BelongsToSetAssociationMixin<DB['Contest'], number>;

    declare createRating: HasOneCreateAssociationMixin<DB['Rating']>;
    declare getRating: HasOneGetAssociationMixin<DB['Rating']>;
    declare addRating: HasOneSetAssociationMixin<DB['Rating'], number>;
    //#endregion
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
