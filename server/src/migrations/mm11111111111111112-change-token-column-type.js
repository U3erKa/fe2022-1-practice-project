module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('RefreshTokens', 'token', {
      type: Sequelize.DataTypes.TEXT,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('RefreshTokens', 'token', {
      type: Sequelize.DataTypes.STRING,
    });
  },
};
