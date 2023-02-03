module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Selects', [
      {
        type: 'typeOfName',
        describe: 'Company',

      },
      {
        type: 'typeOfName',
        describe: 'Product',

      },
      {
        type: 'typeOfName',
        describe: 'Project',

      },
      {
        type: 'nameStyle',
        describe: 'Classic',

      },
      {
        type: 'nameStyle',
        describe: 'Fun',

      },
      {
        type: 'nameStyle',
        describe: 'Professional',

      },
      {
        type: 'nameStyle',
        describe: 'Descriptive',

      },
      {
        type: 'nameStyle',
        describe: 'Youthful',

      },
      {
        type: 'nameStyle',
        describe: 'Any',

      },
      {
        type: 'typeOfTagline',
        describe: 'Classic',

      },
      {
        type: 'typeOfTagline',
        describe: 'Fun',

      },
      {
        type: 'typeOfTagline',
        describe: 'Powerful',

      },
      {
        type: 'typeOfTagline',
        describe: 'Descriptive',

      },
      {
        type: 'typeOfTagline',
        describe: 'Modern',

      },
      {
        type: 'typeOfTagline',
        describe: 'Any',

      },
      {
        type: 'brandStyle',
        describe: 'Techy',

      },
      {
        type: 'brandStyle',
        describe: 'Fun',

      },
      {
        type: 'brandStyle',
        describe: 'Fancy',

      },
      {
        type: 'brandStyle',
        describe: 'Minimal',

      },
      {
        type: 'brandStyle',
        describe: 'Brick & Mortar',

      },
      {
        type: 'brandStyle',
        describe: 'Photo-based',

      },
      {
        type: 'industry',
        describe: 'Creative Agency',
      },
      {
        type: 'industry',
        describe: 'Consulting Firm',
      },
      {
        type: 'industry',
        describe: 'Skin care',
      },
      {
        type: 'industry',
        describe: 'Biotech',
      },
      {
        type: 'industry',
        describe: 'Publisher',
      },
      {
        type: 'industry',
        describe: 'Education',
      },
      {
        type: 'industry',
        describe: 'Footwear',
      },
      {
        type: 'industry',
        describe: 'Medical',
      },
      {
        type: 'industry',
        describe: 'Builders',
      },
    ], {});
  },
};
