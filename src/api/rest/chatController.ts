import http from 'api/interceptor';
import type { POST as BlackListHandler } from 'app/api/blackList/route';
import type { POST as FavoriteHandler } from 'app/api/favorite/route';
import type { POST as GetChatHandler } from 'app/api/getChat/route';
import type { POST as GetPreviewHandler } from 'app/api/getPreview/route';
import type { POST as NewMessageHandler } from 'app/api/newMessage/route';
import { ROUTE } from 'constants/general';
import type { APIHandlerReturn } from 'types/_common';
import type {
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
  GetDialogParams,
  NewMessageParams,
} from 'types/api/chat';

export type GetChatResponse = APIHandlerReturn<typeof GetChatHandler>;
export type GetPreviewResponse = APIHandlerReturn<typeof GetPreviewHandler>;
export type FavoriteResponse = APIHandlerReturn<typeof FavoriteHandler>;
export type BlackListResponse = APIHandlerReturn<typeof BlackListHandler>;
export type NewMessageResponse = APIHandlerReturn<typeof NewMessageHandler>;

export const getDialog = (data: GetDialogParams) =>
  http.post<GetChatResponse>(ROUTE.GET_CHAT, data);

export const getPreviewChat = () =>
  http.post<GetPreviewResponse>(ROUTE.GET_PREVIEW);

export const changeChatFavorite = (data: ChangeChatFavoriteParams) =>
  http.post<FavoriteResponse>(ROUTE.FAVORITE, data);

export const changeChatBlock = (data: ChangeChatBlockParams) =>
  http.post<BlackListResponse>(ROUTE.BLACKLIST, data);

export const newMessage = (data: NewMessageParams) =>
  http.post<NewMessageResponse>(ROUTE.NEW_MESSAGE, data);
