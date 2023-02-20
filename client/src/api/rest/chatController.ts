import http from '../interceptor';

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
