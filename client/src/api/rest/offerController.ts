import http from '../interceptor';

import type {
  SetOfferStatusParams,
  ChangeMarkParams,
  CashOutParams,
  SetNewOfferResponse,
  SetOfferStatusResponse,
  ChangeMarkResponse,
} from 'types/api/offer';

export const setNewOffer = (data: FormData) =>
  http.post<SetNewOfferResponse>('setNewOffer', data);

export const setOfferStatus = <
  T extends SetOfferStatusParams = SetOfferStatusParams,
>(
  data: T,
) => http.post<SetOfferStatusResponse<T['command']>>('setOfferStatus', data);

export const changeMark = (data: ChangeMarkParams) =>
  http.post<ChangeMarkResponse>('changeMark', data);

export const payMent = (data: { formData: FormData }) =>
  http.post<void>('pay', data.formData);

export const cashOut = (data: CashOutParams) =>
  http.post<void>('cashout', data);