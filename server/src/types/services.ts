import type {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';

export type JwtSign = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options?: SignOptions,
) => Promise<string | undefined>;

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

export type TokenOptions = {
  access: {
    secret: Secret;
    expiresIn: SignOptions['expiresIn'];
  };
  refresh: {
    secret: Secret;
    expiresIn: SignOptions['expiresIn'];
  };
};
