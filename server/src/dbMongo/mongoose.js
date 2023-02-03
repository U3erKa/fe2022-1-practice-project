const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = require(configPath)[ env ];

mongoose.connect(
  `mongodb://${ config.host }:${ config.port }/${ config.database }`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

  });

mongoose.set('debug', env === 'development');

module.exports = mongoose;
