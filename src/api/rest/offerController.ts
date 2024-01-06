import http from 'api/interceptor';
import type { POST as CashOutHandler } from 'app/api/cashout/route';
import type { POST as ChangeMarkHandler } from 'app/api/changeMark/route';
import type { GET as GetOffersHandler } from 'app/api/offers/route';
import type { POST as PayHandler } from 'app/api/pay/route';
import type { POST as SetNewOfferHandler } from 'app/api/setNewOffer/route';
import type { POST as SetOfferStatusHandler } from 'app/api/setOfferStatus/route';
import { ROUTE } from 'constants/general';
import type { APIHandlerReturn } from 'types/_common';
import type {
  CashOutParams,
  ChangeMarkParams,
  GetOffersParams,
  SetOfferStatusParams,
} from 'types/offer';

export type SetNewOfferResponse = APIHandlerReturn<typeof SetNewOfferHandler>;
export type SetOfferStatusResponse = APIHandlerReturn<
  typeof SetOfferStatusHandler
>;
export type ChangeMarkResponse = APIHandlerReturn<typeof ChangeMarkHandler>;
export type PayResponse = APIHandlerReturn<typeof PayHandler>;
export type CashOutResponse = APIHandlerReturn<typeof CashOutHandler>;
export type GetOffersResponse = APIHandlerReturn<typeof GetOffersHandler>;

export const setNewOffer = (data: FormData) =>
  http.post<SetNewOfferResponse>(ROUTE.SET_NEW_OFFER, data);

export const setOfferStatus = (data: SetOfferStatusParams) =>
  http.post<SetOfferStatusResponse>(ROUTE.SET_OFFER_STATUS, data);

export const changeMark = (data: ChangeMarkParams) =>
  http.post<ChangeMarkResponse>(ROUTE.CHANGE_MARK, data);

export const payMent = (data: { formData: FormData }) =>
  http.post<PayResponse>(ROUTE.PAY, data.formData);

export const cashOut = (data: CashOutParams) =>
  http.post<CashOutResponse>(ROUTE.CASHOUT, data);

export const getOffers = ({ isReviewed, limit, offset }: GetOffersParams) =>
  http.get<GetOffersResponse>(
    `${ROUTE.OFFERS}?${new URLSearchParams({
      isReviewed,
      limit,
      offset,
    } as any)}`,
  );
