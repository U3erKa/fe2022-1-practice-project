

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Banks', {
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  });
};
