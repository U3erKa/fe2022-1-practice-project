

module.exports = (sequelize, DataTypes) => {
  const SelectBox = sequelize.define('Selects', {
    type: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    describe: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });

  return SelectBox;
};
