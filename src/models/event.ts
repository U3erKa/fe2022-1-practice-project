import { DataTypes, Model } from 'sequelize';
import type {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import type { DB, Offer, User } from 'types/models';

export default function Event(sequelize: Sequelize) {
  class Event extends _Event {
    static associate({ User }: DB) {
      Event.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  Event.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      notify: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      timestamps: true,
    },
  );
  return Event;
}

abstract class _Event extends Model<
  InferAttributes<_Event>,
  InferCreationAttributes<_Event>
> {
  declare name: string;
  declare date: Date;
  declare notify: string;

  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;

  declare user?: NonAttribute<DB['User'][]>;

  declare static associations: {
    user: Association<Offer, User>;
  };

  declare createUser: BelongsToCreateAssociationMixin<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare addUser: BelongsToSetAssociationMixin<User, number>;
}
