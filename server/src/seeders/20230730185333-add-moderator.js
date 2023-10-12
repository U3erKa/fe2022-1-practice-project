require('dotenv').config();
const bcrypt = require('bcrypt');

const { MODER_EMAIL, MODER_PASSWORD, SALT_ROUNDS } = process.env;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync(
      MODER_PASSWORD,
      // @ts-expect-error
      isNaN(+SALT_ROUNDS) ? SALT_ROUNDS : +SALT_ROUNDS,
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Moder',
          lastName: 'Moderyuk',
          displayName: 'Moderator',
          role: 'moderator',
          email: MODER_EMAIL,
          password,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {},
};
