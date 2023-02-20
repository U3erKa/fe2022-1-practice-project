import http from '../interceptor';

import type {
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
