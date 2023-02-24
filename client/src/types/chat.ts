import type {
  FAVORITE_PREVIEW_CHAT_MODE,
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
  ADD_CHAT_TO_OLD_CATALOG,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
} from 'constants/general';

import type {
  CatalogId,
  ChatId,
  SenderId,
  WithTimeStamps,
  With_id,
} from './api/_common';

import type {
  Interlocutor,
  Message,
  WithBlackList,
  WithFavoriteList,
  WithParticipants,
} from './api/chat';

export type ChatMode =
  | typeof NORMAL_PREVIEW_CHAT_MODE
  | typeof FAVORITE_PREVIEW_CHAT_MODE
  | typeof BLOCKED_PREVIEW_CHAT_MODE
  | typeof CATALOG_PREVIEW_CHAT_MODE;

export type CatalogCreationMode =
  | typeof ADD_CHAT_TO_OLD_CATALOG
  | typeof CREATE_NEW_CATALOG_AND_ADD_CHAT;

export type Catalog = With_id<CatalogId> & {
  chats: ChatId[];
  catalogName: string;
};

export type MessagePreview = With_id<ChatId> &
  ChatData &
  Omit<WithTimeStamps, 'updatedAt'> & {
    interlocutor: Interlocutor;
    sender: SenderId;
    text: Message['body'];
  };

export type ChatData = With_id<ChatId> &
  WithParticipants &
  WithFavoriteList &
  WithBlackList;
