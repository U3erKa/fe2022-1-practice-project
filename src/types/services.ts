import type {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';

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

export interface ParsedQs {
  [key: string]: ParsedQs | ParsedQs[] | string[] | string | undefined;
}

export type ContestData = {
  typeIndex?: ParsedQs | ParsedQs[] | string[] | string;
  contestId?: ParsedQs | ParsedQs[] | string[] | string;
  industry?: ParsedQs | ParsedQs[] | string[] | string;
  awardSort?: ParsedQs | ParsedQs[] | string[] | string;
};
