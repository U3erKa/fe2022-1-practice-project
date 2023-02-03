const CONSTANTS = require('../constants');
const ServerError = require('../errors/ServerError');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(req.body.password, CONSTANTS.SALT_ROUNDS);
    next();
  } catch (err) {
    next(new ServerError('Server Error on hash password'));
  }
};
