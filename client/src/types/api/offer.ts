import type {
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';

import type { Card, User } from './user';

import type {
  ContestId,
  CreatorId,
  OfferId,
  OrderId,
  UserId,
  WithFile,
  WithId,
  WithLifeSpan,
  WithUUID,
} from './_common';

export type SetOfferStatusParams = WithId<ContestId, 'contestId'> &
  WithId<CreatorId, 'creatorId'> &
  WithId<OfferId, 'offerId'> &
  WithUUID<OrderId, 'orderId'> & {
    command: Commands;
    priority: Priority;
  };

export type SetOfferStatusResponse<T extends Commands = Commands> = Offer &
  OfferStatus<T>;

export type ChangeMarkParams = WithId<CreatorId, 'creatorId'> &
  WithId<OfferId, 'offerId'> & {
    mark: Rating;
    isFirst: boolean;
  };

export type ChangeMarkResponse = WithId<UserId, 'userId'> & { rating: Rating };

export type CashOutParams = Omit<Card, 'name' | 'balance'> & {
  sum: Card['balance'];
};

export type SetNewOfferResponse = WithId<OfferId> &
  Partial<WithFile> & {
    status: typeof OFFER_STATUS_APPROVED;
    text: Offer['text'];
    User: UserInOffer;
  };

export type UserInOffer = WithId<UserId> &
  WithId<UserId, 'userId'> &
  Omit<User, 'password' | 'accessToken'> &
  WithLifeSpan;

export type Offer = WithId<OfferId> &
  WithId<UserId, 'userId'> &
  WithId<ContestId, 'contestId'> &
  Partial<WithFile> &
  WithOfferStatus & { text: string };

export type OfferStatus<T extends Commands> = T extends 'resolve'
  ? typeof OFFER_STATUS_WON
  : typeof OFFER_STATUS_REJECTED;

export type Priority = 1 | 2 | 3;
export type Rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type Commands = 'resolve' | 'reject';

export type WithOfferStatus = {
  status:
    | OfferStatus<'resolve'>
    | OfferStatus<'reject'>
    | typeof OFFER_STATUS_PENDING;
};
