import jwt, {
  type Secret,
  type Jwt,
  type JwtPayload,
  type SignOptions,
  type VerifyOptions,
} from 'jsonwebtoken';
import { promisify } from 'util';
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

const tokenOptions = {
  access: {
    expiresIn: ACCESS_TOKEN_TIME,
    secret: ACCESS_TOKEN_SECRET!,
  },
  refresh: {
    expiresIn: REFRESH_TOKEN_TIME,
    secret: REFRESH_TOKEN_SECRET!,
  },
} satisfies TokenOptions;

const createToken = (
  payload: TokenData,
  { secret, expiresIn }: TokenOptions[keyof TokenOptions],
) => jwtSign(payload, secret, { expiresIn });

const verifyToken = (token: string, { secret }: { secret: Secret }) =>
  jwtVerify(token, secret) as Promise<TokenData>;

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
