

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Ratings', {
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
    timestamps: false,
  });

  return Rating;
};
