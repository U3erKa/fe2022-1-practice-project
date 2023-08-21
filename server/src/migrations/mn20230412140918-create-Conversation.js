/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'conversations',
      {
        _id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        participant1: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        participant2: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        favoriteList: {
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
          allowNull: false,
          defaultValue: [false, false],
        },
        blackList: {
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
          allowNull: false,
          defaultValue: [false, false],
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          participants: { fields: ['participant1', 'participant2'] },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conversations');
  },
};
