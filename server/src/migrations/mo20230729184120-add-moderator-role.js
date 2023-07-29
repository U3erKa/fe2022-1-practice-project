/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Users_role" ADD VALUE 'moderator';`,
    );
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.changeColumn(
      'Users',
      'role',
      { type: Sequelize.STRING, allowNull: false },
      { transaction },
    );

    await queryInterface.sequelize.query(`DROP TYPE "enum_Users_role";`, {
      transaction,
    });

    await queryInterface.changeColumn(
      'Users',
      'role',
      { type: Sequelize.ENUM('customer', 'creator'), allowNull: false },
      { transaction },
    );

    await transaction.commit()
  },
};
