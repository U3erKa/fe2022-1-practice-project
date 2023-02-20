import type { Status } from 'types/contest';
import type { UserWithoutPassword } from './user';

import type {
  ContestId,
  CreatorId,
  OfferId,
  OrderId,
  UserId,
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

export type SetOfferStatusResponse<T extends SetOfferStatusParams['command']> =
  Offer & OfferStatus<T>;

export type ChangeMarkParams = WithId<CreatorId, 'creatorId'> &
  WithId<OfferId, 'offerId'> & {
    mark: Rating;
    isFirst: boolean;
  };

export type ChangeMarkResponse = WithId<UserId, 'userId'> & { rating: Rating };

export type CashOutParams = {
  number: string | number;
  expiry: string | number;
  cvc: string | number;
  sum: string | number;
};

export type SetNewOfferResponse = WithId<OfferId> &
  WithFile & {
    status: Status;
    text: Offer['text'];
    User: UserInOffer;
  };

export type UserInOffer = WithId<UserId> &
  WithId<UserId, 'userId'> &
  UserWithoutPassword &
  WithLifeSpan;

export type Offer = WithId<OfferId> &
  WithId<UserId, 'userId'> &
  WithId<ContestId, 'contestId'> &
  WithFile & {
    text: string;
    status: OfferStatus<'resolve'> | OfferStatus<'reject'>;
  };

export type OfferStatus<T extends Commands> = {
  status: T extends 'resolve' ? 'resolved' : 'rejected';
};

export type Priority = 1 | 2 | 3;
export type Rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type Commands = 'resolve' | 'reject';

export type WithFile = {
  fileName?: string | null;
  originalFileName?: string | null;
};
