import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes,
  NonAttribute, ForeignKey, Association,
  BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
} from 'sequelize';
import type { DB } from '../types/models';

const Rating = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Rating extends Model<
    InferAttributes<Rating>,
    InferCreationAttributes<Rating>
  > {
    static associate({ User, Offer }: DB) {
      Rating.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Rating.belongsTo(Offer, { foreignKey: 'offerId', targetKey: 'id' });
    }

    //#region Model declarations
    declare mark: number;

    declare offerId: ForeignKey<InstanceType<DB['Offer']>['id']>;
    declare userId: ForeignKey<InstanceType<DB['User']>['id']>;

    declare user?: NonAttribute<DB['User'][]>;
    declare offer?: NonAttribute<DB['Offer'][]>;

    declare static associations: {
      user: Association<DB['Rating'], DB['User']>;
      offer: Association<DB['Rating'], DB['Offer']>;
    };

    declare createUser: BelongsToCreateAssociationMixin<DB['User']>;
    declare getUser: BelongsToGetAssociationMixin<DB['User']>;
    declare addUser: BelongsToSetAssociationMixin<DB['User'], number>;

    declare createOffer: BelongsToCreateAssociationMixin<DB['Offer']>;
    declare getOffer: BelongsToGetAssociationMixin<DB['Offer']>;
    declare addOffer: BelongsToSetAssociationMixin<DB['Offer'], number>;
    //#endregion
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
