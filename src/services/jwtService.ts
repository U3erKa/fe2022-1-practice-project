import { promisify } from 'util';
import jwt, {
  type Jwt,
  type JwtPayload,
  type Secret,
  type SignOptions,
  type VerifyOptions,
} from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} from 'constants/backend';
import type { User } from 'types/models';

export type JwtSign = (
  payload: Buffer | object | string,
  secretOrPrivateKey: Secret,
  options?: SignOptions,
) => Promise<string>;

export type JwtVerify<Complete = unknown> = (
  token: string,
  secretOrPublicKey: Secret,
  options?: VerifyOptions,
) => Promise<
  Complete extends true
    ? Jwt
    : Complete extends false
      ? JwtPayload | string
      : Jwt | JwtPayload | string
>;

export type TokenData = Pick<
  User,
  | 'avatar'
  | 'balance'
  | 'displayName'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'rating'
  | 'role'
> & { userId: User['id'] };

// @ts-expect-error
const jwtSign: JwtSign = promisify(jwt.sign);
const jwtVerify: JwtVerify = promisify(jwt.verify);

export const generateTokenPair = async (payload: TokenData) => {
  const [accessToken, refreshToken] = await Promise.all([
    jwtSign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_TIME }),
    jwtSign(payload, REFRESH_TOKEN_SECRET!, { expiresIn: REFRESH_TOKEN_TIME }),
  ]);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) =>
  jwtVerify(token, ACCESS_TOKEN_SECRET!) as Promise<TokenData>;
export const verifyRefreshToken = (token: string) =>
  jwtVerify(token, REFRESH_TOKEN_SECRET!) as Promise<TokenData>;
