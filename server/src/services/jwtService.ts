import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} from '../constants';

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

export const generateTokenPair = async (payload) => {
  return {
    accessToken: await createToken(payload, tokenOptions.access),
    refreshToken: await createToken(payload, tokenOptions.refresh),
  };
};

export const verifyAccessToken = async (token) =>
  verifyToken(token, tokenOptions.access);
export const verifyRefreshToken = async (token) =>
  verifyToken(token, tokenOptions.refresh);
