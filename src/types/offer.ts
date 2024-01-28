import type {
  OFFER_COMMAND_APPROVE,
  OFFER_COMMAND_DISCARD,
  OFFER_COMMAND_REJECT,
  OFFER_COMMAND_RESOLVE,
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';
import type { WithId, WithPagination, WithUUID } from 'types/_common';
import type { Bank } from 'types/models';

export type SetOfferStatusParams = WithId<'offerId'> &
  (
    | { command: ModeratorCommand }
    | (WithId<'contestId' | 'creatorId'> &
        WithUUID<'orderId'> & {
          command: CustomerCommand;
          priority: Priority;
        })
  );

export type ChangeMarkParams = WithId<'creatorId' | 'offerId'> & {
  mark: Rating;
  isFirst: boolean;
};

export type CashOutParams = Omit<
  Bank['dataValues'],
  'balance' | 'cardNumber' | 'name'
> & {
  sum: Bank['balance'];
  number: Bank['cardNumber'];
};

export type GetOffersParams = Partial<WithPagination> & {
  isReviewed?: boolean;
};

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
  | typeof OFFER_COMMAND_REJECT
  | typeof OFFER_COMMAND_RESOLVE;
export type ModeratorCommand =
  | typeof OFFER_COMMAND_APPROVE
  | typeof OFFER_COMMAND_DISCARD;
export type CardField =
  | keyof Omit<Bank['dataValues'], 'balance' | 'cardNumber'>
  | 'number';

export type WithOfferStatus<T = Commands> = {
  status: OfferStatus<T>;
};
