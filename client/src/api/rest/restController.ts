import http from '../interceptor';

import type {
  SetOfferStatusParams,
  ChangeMarkParams,
  CashOutParams,
  SetNewOfferResponse,
  SetOfferStatusResponse,
  ChangeMarkResponse,
} from 'types/api/offer';

import type {
  GetDialogParams,
  ChangeChatFavoriteParams,
  ChangeChatBlockParams,
  NewMessageParams,
  GetDialogResponse,
  GetPreviewChatResponse,
  ChangeChatFavoriteResponse,
  ChangeChatBlockResponse,
  NewMessageResponse,
} from 'types/api/chat';

import {
  AddChatToCatalogParams,
  AddChatToCatalogResponse,
  RemoveChatFromCatalogParams,
  RemoveChatFromCatalogResponse,
  GetCatalogListResponse,
  CreateCatalogParams,
  CreateCatalogResponse,
  DeleteCatalogParams,
  DeleteCatalogResponse,
  ChangeCatalogNameParams,
  ChangeCatalogNameResponse,
} from 'types/api/catalog';

import type { UpdateUserResponse } from 'types/api/user';

export const updateUser = (data: FormData) =>
  http.post<UpdateUserResponse>('updateUser', data);

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

export const getDialog = (data: GetDialogParams) =>
  http.post<GetDialogResponse>('getChat', data);

export const getPreviewChat = () =>
  http.post<GetPreviewChatResponse>('getPreview');

export const changeChatFavorite = (data: ChangeChatFavoriteParams) =>
  http.post<ChangeChatFavoriteResponse>('favorite', data);

export const changeChatBlock = (data: ChangeChatBlockParams) =>
  http.post<ChangeChatBlockResponse>('blackList', data);

export const newMessage = (data: NewMessageParams) =>
  http.post<NewMessageResponse>('newMessage', data);

export const addChatToCatalog = (data: AddChatToCatalogParams) =>
  http.post<AddChatToCatalogResponse>('addNewChatToCatalog', data);

export const removeChatFromCatalog = (data: RemoveChatFromCatalogParams) =>
  http.post<RemoveChatFromCatalogResponse>('removeChatFromCatalog', data);

export const getCatalogList = () =>
  http.post<GetCatalogListResponse>('getCatalogs');

export const createCatalog = (data: CreateCatalogParams) =>
  http.post<CreateCatalogResponse>('createCatalog', data);

export const deleteCatalog = (data: DeleteCatalogParams) =>
  http.post<DeleteCatalogResponse>('deleteCatalog', data);

export const changeCatalogName = (data: ChangeCatalogNameParams) =>
  http.post<ChangeCatalogNameResponse>('updateNameCatalog', data);
