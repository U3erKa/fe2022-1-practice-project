require('dotenv').config();
const {
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_EXPIRY,
  SQUADHELP_BANK_CVC,
} = process.env;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Banks',
      [
        {
          cardNumber: SQUADHELP_BANK_NUMBER,
          name: SQUADHELP_BANK_NAME,
          expiry: SQUADHELP_BANK_EXPIRY,
          cvc: SQUADHELP_BANK_CVC,
          balance: 5000,
        },
        {
          cardNumber: '4111111111111111',
          name: 'yriy',
          expiry: '09/33',
          cvc: '505',
          balance: 5000,
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banks', {
      cardNumber: {
        [Sequelize.Op.or]: [SQUADHELP_BANK_NUMBER, '4111111111111111'],
      },
    });
  },
};
