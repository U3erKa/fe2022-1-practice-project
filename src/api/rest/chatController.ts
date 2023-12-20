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
  http.post<GetPreviewChatResponse>('getPreview');

export const changeChatFavorite = (data: ChangeChatFavoriteParams) =>
  http.post<ChangeChatFavoriteResponse>('favorite', data);

export const changeChatBlock = (data: ChangeChatBlockParams) =>
  http.post<ChangeChatBlockResponse>('blackList', data);

export const newMessage = (data: NewMessageParams) =>
  http.post<NewMessageResponse>('newMessage', data);
