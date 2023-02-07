const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenOptions = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_TIME,
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_TIME,
  },
};

const createToken = async (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, { expiresIn });

const verifyToken = async (token, { secret }) => jwtVerify(token, secret);

module.exports.generateTokenPair = async (payload) => {
  return {
    accessToken: await createToken(payload, tokenOptions.access),
    refreshToken: await createToken(payload, tokenOptions.refresh),
  };
};

module.exports.verifyAccessToken = async (token) =>
  verifyToken(token, tokenOptions.access);
module.exports.verifyRefreshToken = async (token) =>
  verifyToken(token, tokenOptions.refresh);
