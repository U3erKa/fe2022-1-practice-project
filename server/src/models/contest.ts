import { Model } from 'sequelize';
// prettier-ignore
import type { 
  DataTypes as _DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
} from 'sequelize';
import type { DB } from '../types/models';

const Contest = (sequelize: DB['sequelize'], DataTypes: typeof _DataTypes) => {
  class Contest extends Model<
    InferAttributes<Contest>,
    InferCreationAttributes<Contest>
  > {
    declare contestType: 'name' | 'tagline' | 'logo';
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
    declare priority: number;

    declare id: CreationOptional<number>;
    declare orderId: string;
    declare userId: number;
    declare createdAt: CreationOptional<Date>;

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
          model: 'Users',
          key: 'id',
        },
      },
      contestType: {
        allowNull: false,
        type: DataTypes.ENUM('name', 'tagline', 'logo'),
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
};

export = Contest;
