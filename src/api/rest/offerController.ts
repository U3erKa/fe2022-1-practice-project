import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type {
  CashOutParams,
  ChangeMarkParams,
  ChangeMarkResponse,
  GetOffersParams,
  GetOffersResponse,
  SetNewOfferResponse,
  SetOfferStatusParams,
  SetOfferStatusResponse,
} from 'types/api/offer';

export const setNewOffer = (data: FormData) =>
  http.post<SetNewOfferResponse>(ROUTE.SET_NEW_OFFER, data);

export const setOfferStatus = <
  T extends SetOfferStatusParams = SetOfferStatusParams,
>(
  data: T,
) =>
  http.post<SetOfferStatusResponse<T['command']>>(ROUTE.SET_OFFER_STATUS, data);

export const changeMark = (data: ChangeMarkParams) =>
  http.post<ChangeMarkResponse>(ROUTE.CHANGE_MARK, data);

export const payMent = (data: { formData: FormData }) =>
  http.post<void>(ROUTE.PAY, data.formData);

export const cashOut = (data: CashOutParams) =>
  http.post<void>(ROUTE.CASHOUT, data);

export const getOffers = <IsReviewed = GetOffersParams['isReviewed']>({
  isReviewed,
  limit,
  offset,
}: GetOffersParams) =>
  http.get<GetOffersResponse<IsReviewed>>(
    `${ROUTE.OFFERS}?${new URLSearchParams({
      isReviewed,
      limit,
      offset,
    } as any)}`,
  );
