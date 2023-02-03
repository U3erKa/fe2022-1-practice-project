
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Selects', {
      type: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Selects');
  },
};
