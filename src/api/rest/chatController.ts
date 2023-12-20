import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type {
  ChangeChatBlockParams,
  ChangeChatBlockResponse,
  ChangeChatFavoriteParams,
  ChangeChatFavoriteResponse,
  GetDialogParams,
  GetDialogResponse,
  GetPreviewChatResponse,
  NewMessageParams,
  NewMessageResponse,
} from 'types/api/chat';

export const getDialog = (data: GetDialogParams) =>
  http.post<GetDialogResponse>(ROUTE.GET_CHAT, data);

export const getPreviewChat = () =>
  http.post<GetPreviewChatResponse>(ROUTE.GET_PREVIEW);

export const changeChatFavorite = (data: ChangeChatFavoriteParams) =>
  http.post<ChangeChatFavoriteResponse>(ROUTE.FAVORITE, data);

export const changeChatBlock = (data: ChangeChatBlockParams) =>
  http.post<ChangeChatBlockResponse>('blackList', data);

export const newMessage = (data: NewMessageParams) =>
  http.post<NewMessageResponse>('newMessage', data);
