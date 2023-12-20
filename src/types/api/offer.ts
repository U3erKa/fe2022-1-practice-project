import type {
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';
import type {
  OFFER_COMMAND_APPROVE,
  OFFER_COMMAND_DISCARD,
  OFFER_COMMAND_REJECT,
  OFFER_COMMAND_RESOLVE,
} from 'constants/general';
import type {
  ContestId,
  CreatorId,
  OfferId,
  OrderId,
  UserId,
  WithFile,
  WithId,
  WithLifeSpan,
  WithPagination,
  WithUUID,
} from './_common';
import type { Card, User } from './user';

export type SetOfferStatusParams = WithId<OfferId, 'offerId'> &
  (
    | (WithId<ContestId, 'contestId'> &
        WithId<CreatorId, 'creatorId'> &
        WithUUID<'orderId'> & {
          command: CustomerCommand;
          priority: Priority;
        })
    | { command: ModeratorCommand }
  );

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

export type GetOffersParams = Partial<WithPagination> & {
  isReviewed?: boolean;
};

export type GetOffersResponse<IsReviewed> = {
  offers: ModeratorOffer<IsReviewed>[];
  haveMore: boolean;
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

export type ModeratorOffer<IsReviewed> = Offer &
  (IsReviewed extends true
    ? WithOfferStatus<ModeratorCommand>
    : WithOfferStatus<CustomerCommand | ''>);

export type OfferStatus<T = Commands> = T extends typeof OFFER_COMMAND_RESOLVE
  ? typeof OFFER_STATUS_WON
  : T extends typeof OFFER_COMMAND_REJECT
    ? typeof OFFER_STATUS_REJECTED
    : T extends typeof OFFER_COMMAND_APPROVE
      ? typeof OFFER_STATUS_APPROVED
      : T extends typeof OFFER_COMMAND_DISCARD
        ? typeof OFFER_STATUS_DISCARDED
        : typeof OFFER_STATUS_PENDING;

export type Priority = 1 | 2 | 3;
export type Rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type Commands = CustomerCommand | ModeratorCommand;
export type CustomerCommand =
  | typeof OFFER_COMMAND_RESOLVE
  | typeof OFFER_COMMAND_REJECT;
export type ModeratorCommand =
  | typeof OFFER_COMMAND_APPROVE
  | typeof OFFER_COMMAND_DISCARD;
export type CardField = keyof Omit<Card, 'balance'>;

export type WithOfferStatus<T = Commands> = {
  status: OfferStatus<T>;
};
