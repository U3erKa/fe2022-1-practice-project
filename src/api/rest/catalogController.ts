import http from 'api/interceptor';
import type {
  AddChatToCatalogParams,
  AddChatToCatalogResponse,
  ChangeCatalogNameParams,
  ChangeCatalogNameResponse,
  CreateCatalogParams,
  CreateCatalogResponse,
  DeleteCatalogParams,
  DeleteCatalogResponse,
  GetCatalogListResponse,
  RemoveChatFromCatalogParams,
  RemoveChatFromCatalogResponse,
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
