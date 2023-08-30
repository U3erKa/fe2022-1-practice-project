import jwt, { Secret } from 'jsonwebtoken';
import { promisify } from 'util';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} from '../constants';

import type { TokenData } from '../types/user';
import type { JwtSign, JwtVerify, TokenOptions } from '../types/services';
// @ts-expect-error
const jwtSign: JwtSign = promisify(jwt.sign);
const jwtVerify: JwtVerify = promisify(jwt.verify);

const tokenOptions: TokenOptions = {
  access: {
    secret: ACCESS_TOKEN_SECRET!,
    expiresIn: ACCESS_TOKEN_TIME,
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET!,
    expiresIn: REFRESH_TOKEN_TIME,
  },
};

const createToken = async (
  payload: TokenData,
  { secret, expiresIn }: TokenOptions[keyof TokenOptions],
) => jwtSign(payload, secret, { expiresIn });

const verifyToken = async (token: string, { secret }: { secret: Secret }) =>
  jwtVerify(token, secret);

export const generateTokenPair = async (payload: TokenData) => {
  return {
    accessToken: await createToken(payload, tokenOptions.access),
    refreshToken: await createToken(payload, tokenOptions.refresh),
  };
};

export const verifyAccessToken = async (token: string) =>
  verifyToken(token, tokenOptions.access);
export const verifyRefreshToken = async (token: string) =>
  verifyToken(token, tokenOptions.refresh);
