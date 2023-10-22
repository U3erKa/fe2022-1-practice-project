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
} from '../constants';
import type { UserId } from '.';

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

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export type ContestData = {
  typeIndex?: string | string[] | ParsedQs | ParsedQs[];
  contestId?: string | string[] | ParsedQs | ParsedQs[];
  industry?: string | string[] | ParsedQs | ParsedQs[];
  awardSort?: string | string[] | ParsedQs | ParsedQs[];
};

export type Status = {
  status: {
    [Or: symbol]: [
      typeof CONTEST_STATUS_FINISHED,
      typeof CONTEST_STATUS_ACTIVE,
    ];
  };
};

export type WhereForAllContests = ContestData & Status;
export type Contest = { status?: string | string[]; userId?: UserId };
export type WhereForCustomerContests = Contest & {};
