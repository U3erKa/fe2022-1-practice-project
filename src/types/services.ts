import type {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';
import type {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
} from 'constants/general';
import type { UserId } from '.';

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

export type Status = {
  status: Record<
    symbol,
    [typeof CONTEST_STATUS_FINISHED, typeof CONTEST_STATUS_ACTIVE]
  >;
};

export type WhereForAllContests = ContestData & Status;
export type Contest = { status?: string[] | string; userId?: UserId };
export type WhereForCustomerContests = Contest & {};
