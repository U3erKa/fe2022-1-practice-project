import type {
  ADD_CHAT_TO_OLD_CATALOG,
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';
import type { ChatId, SenderId, WithId, WithTimeStamps } from './api/_common';
import type {
  Interlocutor,
  Message,
  WithBlackList,
  WithFavoriteList,
  WithParticipants,
} from './api/chat';

export type ChatMode =
  | typeof BLOCKED_PREVIEW_CHAT_MODE
  | typeof CATALOG_PREVIEW_CHAT_MODE
  | typeof FAVORITE_PREVIEW_CHAT_MODE
  | typeof NORMAL_PREVIEW_CHAT_MODE;

export type CatalogCreationMode =
  | typeof ADD_CHAT_TO_OLD_CATALOG
  | typeof CREATE_NEW_CATALOG_AND_ADD_CHAT;

export type Catalog = WithId<'_id'> & {
  chats: ChatId[];
  catalogName: string;
};

export type MessagePreview = ChatData &
  Omit<WithTimeStamps, 'updatedAt'> &
  WithId<'_id'> & {
    interlocutor: Interlocutor;
    sender: SenderId;
    text: Message['body'];
  };

export type ChatData = WithBlackList &
  WithFavoriteList &
  WithId<'_id'> &
  WithParticipants;
