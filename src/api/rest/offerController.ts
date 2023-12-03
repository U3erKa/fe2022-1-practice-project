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
  http.post<SetNewOfferResponse>('setNewOffer', data);

export const setOfferStatus = <
  T extends SetOfferStatusParams = SetOfferStatusParams,
>(
  data: T,
) =>
  http.post<SetOfferStatusResponse<T['command']>>(ROUTE.SET_OFFER_STATUS, data);

export const changeMark = (data: ChangeMarkParams) =>
  http.post<ChangeMarkResponse>('changeMark', data);

export const payMent = (data: { formData: FormData }) =>
  http.post<void>('pay', data.formData);

export const cashOut = (data: CashOutParams) =>
  http.post<void>('cashout', data);

export const getOffers = <IsReviewed = GetOffersParams['isReviewed']>({
  limit,
  offset,
  isReviewed,
}: GetOffersParams) =>
  http.get<GetOffersResponse<IsReviewed>>(
    `offers?${new URLSearchParams({ limit, offset, isReviewed } as any)}`,
  );
