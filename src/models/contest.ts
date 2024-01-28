import type { UUID } from 'crypto';
import {
  DataTypes,
  Model,
  type Association,
  type BelongsToCreateAssociationMixin,
  type BelongsToGetAssociationMixin,
  type BelongsToSetAssociationMixin,
  type CreationOptional,
  type ForeignKey,
  type HasManyAddAssociationMixin,
  type HasManyAddAssociationsMixin,
  type HasManyCountAssociationsMixin,
  type HasManyCreateAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManyHasAssociationMixin,
  type HasManyHasAssociationsMixin,
  type HasManyRemoveAssociationMixin,
  type HasManyRemoveAssociationsMixin,
  type HasManySetAssociationsMixin,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type Sequelize,
} from 'sequelize';
import { LOGO_CONTEST, NAME_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import type { Contest, DB, Offer, User } from 'types/models';
import type { Priority } from 'types/offer';

export default function Contest(sequelize: Sequelize) {
  class Contest extends _Contest {
    static associate({ User, Offer }: DB) {
      Contest.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
      Contest.hasMany(Offer, { foreignKey: 'contestId', sourceKey: 'id' });
    }
  }
  Contest.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: 'Users',
        },
      },
      contestType: {
        allowNull: false,
        type: DataTypes.ENUM(NAME_CONTEST, TAGLINE_CONTEST, LOGO_CONTEST),
      },
      fileName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      originalFileName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      industry: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      focusOfWork: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      styleName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      nameVenture: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      brandStyle: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Contest',
      timestamps: false,
    },
  );
  return Contest;
}

abstract class _Contest extends Model<
  InferAttributes<_Contest>,
  InferCreationAttributes<_Contest>
> {
  declare contestType:
    | typeof LOGO_CONTEST
    | typeof NAME_CONTEST
    | typeof TAGLINE_CONTEST;
  declare fileName?: CreationOptional<string>;
  declare originalFileName?: CreationOptional<string>;
  declare title?: CreationOptional<string>;
  declare typeOfName?: CreationOptional<string>;
  declare industry?: CreationOptional<string>;
  declare focusOfWork?: CreationOptional<string>;
  declare targetCustomer?: CreationOptional<string>;
  declare styleName?: CreationOptional<string>;
  declare nameVenture?: CreationOptional<string>;
  declare typeOfTagline?: CreationOptional<string>;
  declare brandStyle?: CreationOptional<string>;
  declare status: string;
  declare prize: number;
  declare priority: Priority;

  declare id: CreationOptional<number>;
  declare orderId: UUID;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;

  declare user?: NonAttribute<DB['User'][]>;
  declare offers?: NonAttribute<DB['Offer'][]>;

  declare static associations: {
    user: Association<Contest, User>;
    offers: Association<Contest, Offer>;
  };

  declare createUser: BelongsToCreateAssociationMixin<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;

  declare getOffers: HasManyGetAssociationsMixin<Offer>;
  declare addOffer: HasManyAddAssociationMixin<Offer, number>;
  declare addOffers: HasManyAddAssociationsMixin<Offer, number>;
  declare setOffers: HasManySetAssociationsMixin<Offer, number>;
  declare removeOffer: HasManyRemoveAssociationMixin<Offer, number>;
  declare removeOffers: HasManyRemoveAssociationsMixin<Offer, number>;
  declare hasOffer: HasManyHasAssociationMixin<Offer, number>;
  declare hasOffers: HasManyHasAssociationsMixin<Offer, number>;
  declare countOffers: HasManyCountAssociationsMixin;
  declare createOffer: HasManyCreateAssociationMixin<Offer, 'contestId'>;
}
