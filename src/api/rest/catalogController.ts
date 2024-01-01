import http from 'api/interceptor';
import type { POST as AddNewChatToCatalogHandler } from 'app/api/addNewChatToCatalog/route';
import type { POST as CreateCatalogHandler } from 'app/api/createCatalog/route';
import type { POST as DeleteCatalogHandler } from 'app/api/deleteCatalog/route';
import type { POST as GetCatalogsHandler } from 'app/api/getCatalogs/route';
import type { POST as RemoveChatFromCatalogHandler } from 'app/api/removeChatFromCatalog/route';
import type { POST as UpdateNameCatalogHandler } from 'app/api/updateNameCatalog/route';
import { ROUTE } from 'constants/general';
import type { APIHandlerReturn } from 'types/_common';
import type {
  AddChatToCatalogParams,
  ChangeCatalogNameParams,
  CreateCatalogParams,
  DeleteCatalogParams,
  RemoveChatFromCatalogParams,
} from 'types/api/catalog';

export type AddNewChatToCatalogResponse = APIHandlerReturn<
  typeof AddNewChatToCatalogHandler
>;
export type RemoveChatFromCatalogResponse = APIHandlerReturn<
  typeof RemoveChatFromCatalogHandler
>;
export type GetCatalogsResponse = APIHandlerReturn<typeof GetCatalogsHandler>;
export type CreateCatalogResponse = APIHandlerReturn<
  typeof CreateCatalogHandler
>;
export type DeleteCatalogResponse = APIHandlerReturn<
  typeof DeleteCatalogHandler
>;
export type UpdateNameCatalogResponse = APIHandlerReturn<
  typeof UpdateNameCatalogHandler
>;

export const addChatToCatalog = (data: AddChatToCatalogParams) =>
  http.post<AddNewChatToCatalogResponse>(ROUTE.ADD_NEW_CHAT_TO_CATALOG, data);

export const removeChatFromCatalog = (data: RemoveChatFromCatalogParams) =>
  // prettier-ignore
  http.post<RemoveChatFromCatalogResponse>(ROUTE.REMOVE_CHAT_FROM_CATALOG, data);

export const getCatalogList = () =>
  http.post<GetCatalogsResponse>(ROUTE.GET_CATALOGS);

export const createCatalog = (data: CreateCatalogParams) =>
  http.post<CreateCatalogResponse>(ROUTE.CREATE_CATALOG, data);

export const deleteCatalog = (data: DeleteCatalogParams) =>
  http.post<DeleteCatalogResponse>(ROUTE.DELETE_CATALOG, data);

export const changeCatalogName = (data: ChangeCatalogNameParams) =>
  http.post<UpdateNameCatalogResponse>(ROUTE.UPDATE_NAME_CATALOG, data);
