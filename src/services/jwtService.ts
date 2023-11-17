import jwt, { type Secret } from 'jsonwebtoken';
import { promisify } from 'util';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} from '../constants/backend';

import type { TokenData } from '../types/user';
import type { JwtSign, JwtVerify, TokenOptions } from '../types/services';
// @ts-expect-error
const jwtSign: JwtSign = promisify(jwt.sign);
const jwtVerify: JwtVerify = promisify(jwt.verify);

const tokenOptions = {
  access: {
    secret: ACCESS_TOKEN_SECRET!,
    expiresIn: ACCESS_TOKEN_TIME,
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET!,
    expiresIn: REFRESH_TOKEN_TIME,
  },
} satisfies TokenOptions;

const createToken = (
  payload: TokenData,
  { secret, expiresIn }: TokenOptions[keyof TokenOptions],
) => jwtSign(payload, secret, { expiresIn });

const verifyToken = (token: string, { secret }: { secret: Secret }) =>
  jwtVerify(token, secret);

export const generateTokenPair = async (payload: TokenData) => {
  const [accessToken, refreshToken] = await Promise.all([
    createToken(payload, tokenOptions.access),
    createToken(payload, tokenOptions.refresh),
  ]);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) =>
  verifyToken(token, tokenOptions.access);
export const verifyRefreshToken = (token: string) =>
  verifyToken(token, tokenOptions.refresh);
